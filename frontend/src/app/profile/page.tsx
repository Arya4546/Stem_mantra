"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";
import { useAuth } from "@/providers/auth-provider";
import { apiClient } from "@/lib/api-client";
import { UserLayout } from "@/components/user/UserLayout";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Calendar,
  BookOpen,
  Award,
  Edit2,
  Save,
  X,
  Loader2,
} from "lucide-react";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    bio: "",
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiClient.get<{
          firstName: string;
          lastName?: string;
          email: string;
          phone?: string;
          avatar?: string;
          address?: string;
          city?: string;
          state?: string;
          bio?: string;
        }>("/auth/profile");
        
        setProfileData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          bio: data.bio || "",
        });
        
        if (data.avatar) {
          setAvatar(data.avatar);
        }
      } catch {
        // Use auth context data as fallback
        setProfileData({
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          phone: user?.phone || "",
          address: "",
          city: "",
          state: "",
          bio: "",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      let avatarUrl = avatar;
      
      // Upload avatar if changed
      if (avatarFile) {
        try {
          const uploadResponse = await apiClient.upload<{ url: string; secureUrl: string }>("/upload/avatar", avatarFile, "avatar");
          avatarUrl = uploadResponse.secureUrl || uploadResponse.url;
        } catch (uploadErr) {
          console.error("Avatar upload failed:", uploadErr);
          toast.error("Failed to upload avatar, but saving other changes");
        }
      }
      
      // Update profile
      const updatedProfile = await apiClient.patch<{
        firstName: string;
        lastName?: string;
        email: string;
        phone?: string;
        avatar?: string;
      }>("/auth/profile", {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        avatar: avatarUrl,
      });
      
      // Update auth context
      updateUser({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        phone: updatedProfile.phone,
      });
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setAvatarFile(null);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Demo stats
  const stats = [
    { label: "Courses Enrolled", value: 4, icon: BookOpen },
    { label: "Certificates Earned", value: 2, icon: Award },
    { label: "Member Since", value: "Jan 2024", icon: Calendar },
  ];

  // Loading state
  if (isFetching) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-slate-600">Loading profile...</p>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
        >
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt="Profile"
                      width={88}
                      height={88}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                      {user?.firstName?.[0] || "U"}
                      {user?.lastName?.[0] || ""}
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white hover:bg-indigo-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-900">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-slate-500">{user?.email}</p>
              </div>

              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-50 rounded-xl p-4 text-center"
                >
                  <stat.icon className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 bg-white rounded-3xl shadow-sm border border-slate-100 p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Personal Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your address"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="City"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={profileData.state}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="State"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={4}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500 resize-none"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </UserLayout>
  );
}
