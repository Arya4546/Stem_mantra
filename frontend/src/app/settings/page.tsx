"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import { apiClient } from "@/lib/api-client";
import { UserLayout } from "@/components/user/UserLayout";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Mail,
  Key,
  Eye,
  EyeOff,
  Save,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

type SettingTab = "account" | "notifications" | "security" | "appearance";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingTab>("account");
  const [isLoading, setIsLoading] = useState(false);

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    language: "en",
    timezone: "Asia/Kolkata",
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNewCourse: true,
    emailPromotions: false,
    emailUpdates: true,
    pushNewCourse: true,
    pushReminders: true,
    smsAlerts: false,
  });

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: "light",
    fontSize: "medium",
  });

  // Load saved preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userPreferences');
      if (saved) {
        try {
          const prefs = JSON.parse(saved);
          if (prefs.language) setAccountSettings(prev => ({ ...prev, language: prefs.language }));
          if (prefs.timezone) setAccountSettings(prev => ({ ...prev, timezone: prefs.timezone }));
          if (prefs.notifications) setNotifications(prefs.notifications);
          if (prefs.appearance) setAppearance(prefs.appearance);
        } catch {
          console.error('Failed to parse saved preferences');
        }
      }
    }
  }, []);

  // Security settings
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // For now, just show success - these settings would be stored locally or in a user preferences table
      // In future, can be extended to store in backend
      if (typeof window !== 'undefined') {
        localStorage.setItem('userPreferences', JSON.stringify({
          language: accountSettings.language,
          timezone: accountSettings.timezone,
          notifications,
          appearance,
        }));
      }
      toast.success("Settings saved successfully!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    
    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    setIsLoading(true);
    try {
      await apiClient.put("/auth/change-password", {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      toast.success("Password changed successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch {
      toast.error("Failed to change password. Check your current password.");
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "account" as const, label: "Account", icon: User },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "appearance" as const, label: "Appearance", icon: Palette },
  ];

  return (
    <UserLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Manage your account preferences and settings</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-slate-100 overflow-x-auto">
            <div className="flex p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Account Tab */}
            {activeTab === "account" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-slate-400" />
                          Language
                        </div>
                      </label>
                      <select
                        value={accountSettings.language}
                        onChange={(e) =>
                          setAccountSettings((prev) => ({ ...prev, language: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={accountSettings.timezone}
                        onChange={(e) =>
                          setAccountSettings((prev) => ({ ...prev, timezone: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Asia/Kolkata">India Standard Time (IST)</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                        <option value="Asia/Singapore">Singapore Time (SGT)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors">
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-slate-400" />
                      Email Notifications
                    </div>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: "emailNewCourse", label: "New courses and programs", desc: "Get notified when new courses are available" },
                      { key: "emailPromotions", label: "Promotions and offers", desc: "Receive special offers and discounts" },
                      { key: "emailUpdates", label: "Platform updates", desc: "Important updates about STEM Mantra" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-start justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-medium text-slate-700">{item.label}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) =>
                              setNotifications((prev) => ({
                                ...prev,
                                [item.key]: e.target.checked,
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-slate-400" />
                      Push Notifications
                    </div>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: "pushNewCourse", label: "New courses", desc: "Push notifications for new courses" },
                      { key: "pushReminders", label: "Reminders", desc: "Course reminders and deadlines" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-start justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-medium text-slate-700">{item.label}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) =>
                              setNotifications((prev) => ({
                                ...prev,
                                [item.key]: e.target.checked,
                              }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    <div className="flex items-center gap-2">
                      <Key className="w-5 h-5 text-slate-400" />
                      Change Password
                    </div>
                  </h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwords.current}
                          onChange={(e) =>
                            setPasswords((prev) => ({ ...prev, current: e.target.value }))
                          }
                          className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwords.new}
                          onChange={(e) =>
                            setPasswords((prev) => ({ ...prev, new: e.target.value }))
                          }
                          className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords((prev) => ({ ...prev, confirm: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button 
                      onClick={handlePasswordChange}
                      disabled={isLoading || !passwords.current || !passwords.new || !passwords.confirm}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-start justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-700">Enable 2FA</p>
                      <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    {[
                      { device: "Chrome on Windows", location: "Noida, India", current: true },
                      { device: "Safari on iPhone", location: "Delhi, India", current: false },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-medium text-slate-700">{session.device}</p>
                          <p className="text-sm text-slate-500">{session.location}</p>
                        </div>
                        {session.current ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Current
                          </span>
                        ) : (
                          <button className="text-red-600 text-sm font-medium hover:text-red-700">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Monitor },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setAppearance((prev) => ({ ...prev, theme: theme.id }))}
                        className={`p-4 rounded-xl border-2 transition-colors ${
                          appearance.theme === theme.id
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <theme.icon className={`w-6 h-6 mx-auto mb-2 ${
                          appearance.theme === theme.id ? "text-indigo-600" : "text-slate-400"
                        }`} />
                        <p className={`text-sm font-medium ${
                          appearance.theme === theme.id ? "text-indigo-600" : "text-slate-600"
                        }`}>
                          {theme.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Font Size</h3>
                  <div className="flex items-center gap-4">
                    {["small", "medium", "large"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setAppearance((prev) => ({ ...prev, fontSize: size }))}
                        className={`px-4 py-2 rounded-xl border-2 transition-colors capitalize ${
                          appearance.fontSize === size
                            ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </UserLayout>
  );
}
