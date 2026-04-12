import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund Policy | STEMmantra - STEM, Robotics & AI Education",
  description:
    "Understand STEMmantra's Refund and Cancellation Policy for lab setup services, equipment purchases, training programs, and educational solutions.",
  robots: { index: true, follow: true },
};

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-20 px-4">
          <div className="mx-auto px-4 md:px-8 lg:px-16">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Refund{" "}
              <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-sm text-gray-500 mb-10">
              Last updated: April 12, 2026
            </p>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
                <p>
                  At STEMmantra, we are committed to delivering exceptional quality in all our products and services. This Refund Policy outlines the terms and conditions under which refunds, returns, or cancellations may be processed for our lab setup services, equipment purchases, training programs, and educational solutions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Lab Setup & Installation Services</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Pre-Installation Cancellation:</strong> If a school or institution cancels a lab setup order before the commencement of installation work, a refund will be processed after deducting any procurement, customization, or administrative costs already incurred (up to 15% of the total order value).</li>
                  <li><strong>Post-Installation:</strong> Once lab installation is completed and the handover is accepted by the institution, no refunds will be applicable for installation services.</li>
                  <li><strong>Defective Installation:</strong> If any defects or issues are identified in the installation within 30 days of handover, STEMmantra will rectify the issue at no additional cost as part of our standard warranty and support commitment.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Equipment & Hardware</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Defective Products:</strong> Any equipment or hardware found to be defective upon delivery or within the manufacturer&apos;s warranty period will be replaced free of charge. Please report any defects within 7 days of delivery along with supporting photographs or videos.</li>
                  <li><strong>Damaged in Transit:</strong> If equipment is damaged during transportation, STEMmantra will arrange a replacement at no additional cost, provided the damage is reported within 48 hours of delivery with photographic evidence.</li>
                  <li><strong>Change of Mind:</strong> Returns or refunds for equipment that has been delivered in good condition and matches the specification agreed upon in the contract are not applicable. All equipment orders are customized to institutional requirements.</li>
                  <li><strong>Warranty Claims:</strong> All hardware comes with a manufacturer&apos;s warranty as specified in the product documentation. Warranty claims will be processed through the respective manufacturer&apos;s support channel.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Training Programs</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Cancellation Before Training:</strong> If a training program is cancelled by the institution at least 7 working days before the scheduled date, a full refund of training fees will be provided.</li>
                  <li><strong>Late Cancellation (less than 7 days):</strong> Cancellations made less than 7 working days before the scheduled training date are eligible for a 50% refund or rescheduling of the training to a mutually agreeable date.</li>
                  <li><strong>During or After Training:</strong> No refunds will be issued for training programs that have commenced or been completed.</li>
                  <li><strong>Cancellation by STEMmantra:</strong> If STEMmantra cancels a training session due to unforeseen circumstances, a full refund or rescheduling will be offered to the institution.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Curriculum & Digital Content</h2>
                <p>
                  Curriculum packages, digital licenses, student workbooks, and other educational content are non-refundable once delivered or activated, as these are intellectual property and can be reproduced. If you received an incorrect or incomplete curriculum package, please contact us within 7 days for a replacement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Refund Process</h2>
                <p>To request a refund, please follow these steps:</p>
                <ol className="list-decimal pl-6 space-y-2 mt-3">
                  <li>Email your refund request to <a href="mailto:sales@stemmantra.com" className="text-orange-600 font-semibold hover:underline">sales@stemmantra.com</a> with your order/agreement reference number</li>
                  <li>Include a detailed reason for the refund request along with any supporting documentation</li>
                  <li>Our team will review your request and respond within 5 working days</li>
                  <li>Approved refunds will be processed within 15–30 working days to the original payment method</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Non-Refundable Items</h2>
                <p>The following are strictly non-refundable:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Services that have been fully delivered and accepted</li>
                  <li>Customized equipment or kits manufactured to specific institutional requirements</li>
                  <li>Digital content, software licenses, and curriculum that has been delivered or activated</li>
                  <li>Consultation fees and site survey charges</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Dispute Resolution</h2>
                <p>
                  If you are dissatisfied with our refund decision, you may escalate the matter by writing to our management team. We are committed to resolving all disputes amicably and fairly. All disputes shall be subject to the jurisdiction of courts in Noida / Gautam Buddh Nagar, Uttar Pradesh, India.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
                <p>For refund-related inquiries, please contact:</p>
                <div className="bg-gray-50 rounded-xl p-6 mt-4 border border-gray-100">
                  <p><strong>STEMmantra</strong></p>
                  <p>C-104, 2nd Floor, Sector-10, Noida, UP – 201301</p>
                  <p>Email: <a href="mailto:sales@stemmantra.com" className="text-orange-600 font-semibold hover:underline">sales@stemmantra.com</a></p>
                  <p>Phone: <a href="tel:+916356631515" className="text-orange-600 font-semibold hover:underline">+91-6356631515</a></p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
