"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Script from "next/script";
import {
  CreditCard,
  ArrowLeft,
  Shield,
  Check,
  Package,
  MapPin,
  User,
  Phone,
  Mail,
  ShoppingCart,
  Smartphone,
  Building,
  Wallet,
  Loader2,
} from "lucide-react";
import { UserLayout } from "@/components/user/UserLayout";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";

// ============================================
// Types
// ============================================

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  thumbnail?: string;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  productId: string;
}

interface Cart {
  id: string;
  items: CartItem[];
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface PaymentInitResponse {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayKeyId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// ============================================
// Checkout Page Component
// ============================================

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [formData, setFormData] = useState({
    // Contact
    customerName: user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "",
    customerEmail: user?.email || "",
    customerPhone: "",
    // Shipping
    address: "",
    city: "",
    state: "",
    pincode: "",
    // Payment
    paymentMethod: "ONLINE",
  });

  // Update form data when user loads
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customerName: user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : prev.customerName,
        customerEmail: user.email || prev.customerEmail,
      }));
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const cartData = await apiClient.get<Cart>("/products/cart/me");
      setCart(cartData);
      // Redirect to cart if empty
      if (!cartData || cartData.items.length === 0) {
        toast.error("Your cart is empty");
        router.push("/dashboard/cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart");
      router.push("/dashboard/cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate totals
  const subtotal = cart?.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  ) || 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Initialize Razorpay payment
  const initializeRazorpay = useCallback(async (orderId: string) => {
    try {
      // Get Razorpay order details
      const paymentData = await apiClient.post<PaymentInitResponse>(`/payments/initiate/${orderId}`);

      const options = {
        key: paymentData.razorpayKeyId,
        amount: paymentData.amount * 100,
        currency: paymentData.currency,
        name: "STEM Mantra",
        description: `Order #${paymentData.orderNumber}`,
        order_id: paymentData.razorpayOrderId,
        prefill: {
          name: paymentData.customerName,
          email: paymentData.customerEmail,
          contact: paymentData.customerPhone,
        },
        notes: {
          orderId: orderId,
          orderNumber: paymentData.orderNumber,
        },
        theme: {
          color: "#6366f1",
        },
        handler: async function (response: RazorpayResponse) {
          try {
            await apiClient.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId,
            });
            toast.success("Payment successful! Your order has been placed.");
            router.push("/dashboard/orders");
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on("payment.failed", function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
        setIsSubmitting(false);
      });

      rzp.open();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to initialize payment");
      setIsSubmitting(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cart || cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.customerPhone.replace(/\D/g, '').slice(-10);
    if (!phoneRegex.test(cleanPhone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order first
      const orderResponse = await apiClient.post<{ id: string }>("/orders", {
        cartId: cart.id,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: {
          name: formData.customerName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
      });

      if (formData.paymentMethod === "ONLINE") {
        if (!razorpayLoaded || !window.Razorpay) {
          toast.error("Payment gateway is loading. Please try again.");
          setIsSubmitting(false);
          return;
        }
        await initializeRazorpay(orderResponse.id);
      } else {
        toast.success("Order placed successfully!");
        router.push("/dashboard/orders");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to place order");
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
            <div className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </UserLayout>
    );
  }

  // Empty cart state
  if (!cart || cart.items.length === 0) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
            <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-600 mb-8">Add some items to your cart before checkout.</p>
            <Link
              href="/dashboard/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Browse Store
            </Link>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Checkout</h1>
            <p className="text-slate-600 mt-1">Complete your order</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Shipping Address
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="House/Flat No., Street, Locality"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{6}"
                    placeholder="6-digit pincode"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Method
              </h2>
              <div className="space-y-3">
                {/* Online Payment Option */}
                <label 
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === "ONLINE" 
                      ? "border-primary bg-primary/5" 
                      : "border-slate-200 hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE"
                    checked={formData.paymentMethod === "ONLINE"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Pay Online</p>
                    <p className="text-sm text-slate-500 mb-3">UPI, Cards, Net Banking, Wallets & More</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-600">
                        <Smartphone className="w-3 h-3" /> UPI
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-600">
                        <CreditCard className="w-3 h-3" /> Cards
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-600">
                        <Building className="w-3 h-3" /> Net Banking
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-600">
                        <Wallet className="w-3 h-3" /> Wallets
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">Secure</span>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label 
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === "COD" 
                      ? "border-primary bg-primary/5" 
                      : "border-slate-200 hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Cash on Delivery</p>
                    <p className="text-sm text-slate-500">Pay when you receive your order</p>
                  </div>
                  <Package className="w-5 h-5 text-slate-400" />
                </label>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-20"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart?.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      {item.product.thumbnail && item.product.thumbnail.length > 0 ? (
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-slate-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-4 border-t border-slate-100">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-slate-500">
                    Free shipping on orders above ₹999
                  </p>
                )}
              </div>

              <div className="flex justify-between py-4 border-t border-slate-100">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-lg font-bold text-primary">{formatPrice(total)}</span>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 py-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Data protection guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Package className="w-5 h-5 text-purple-600" />
                  <span>Fast delivery</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : formData.paymentMethod === "ONLINE" ? (
                  <>
                    Pay {formatPrice(total)}
                    <CreditCard className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Place Order ({formatPrice(total)})
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </form>
      </div>

      {/* Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        strategy="lazyOnload"
      />
    </UserLayout>
  );
}
