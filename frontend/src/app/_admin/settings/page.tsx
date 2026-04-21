"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import api from "@/lib/api";
import {
  Save,
  Globe,
  Mail,
  Bell,
  Shield,
  CloudCog,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string;
  type: string;
  group: string;
  description?: string;
  updatedAt: string;
}

interface SettingsState {
  // General
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  supportEmail: string;
  contactPhone: string;
  address: string;
  // Social
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  // Email
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  // Cloudinary
  cloudinaryCloudName: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
  // Notifications
  emailNotifications: boolean;
  newUserNotification: boolean;
  orderNotification: boolean;
  leadNotification: boolean;
}

const defaultSettings: SettingsState = {
  siteName: "STEMmantra",
  siteDescription: "Leading STEM Education Provider in India",
  siteUrl: "https://stemmantra.com",
  contactEmail: "info@stemmantra.com",
  supportEmail: "support@stemmantra.com",
  contactPhone: "+91-6356631515",
  address: "C-104 2nd Floor, Noida Sec-10, UP – 201301",
  facebook: "",
  twitter: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  smtpHost: "",
  smtpPort: "587",
  smtpUser: "",
  smtpPassword: "",
  cloudinaryCloudName: "",
  cloudinaryApiKey: "",
  cloudinaryApiSecret: "",
  emailNotifications: true,
  newUserNotification: true,
  orderNotification: true,
  leadNotification: true,
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState<SettingsState>(defaultSettings);

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "email", label: "Email", icon: Mail },
    { id: "storage", label: "Storage", icon: CloudCog },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  // Fetch settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);

  // Track changes
  useEffect(() => {
    const changed = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasChanges(changed);
  }, [settings, originalSettings]);

  const fetchSettings = async () => {
    try {
      const response = await api.get<{ data: Setting[] }>('/settings');

      if (response.data?.data) {
        const fetchedSettings = { ...defaultSettings };

        response.data.data.forEach((setting: Setting) => {
          const key = setting.key as keyof SettingsState;
          if (key in fetchedSettings) {
            if (setting.type === 'boolean') {
              (fetchedSettings as Record<string, unknown>)[key] = setting.value === 'true';
            } else {
              (fetchedSettings as Record<string, unknown>)[key] = setting.value;
            }
          }
        });

        setSettings(fetchedSettings);
        setOriginalSettings(fetchedSettings);
      }
    } catch (error: unknown) {
      console.error('Failed to fetch settings:', error);
      // Use defaults if fetch fails
      toast.error('Failed to load settings. Using defaults.');
    } finally {
      setIsInitialLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Prepare settings array for bulk update
      const settingsToSave = Object.entries(settings).map(([key, value]) => {
        let type = 'string';
        let group = 'general';

        if (typeof value === 'boolean') {
          type = 'boolean';
        }

        // Determine group based on key
        if (['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].includes(key)) {
          group = 'social';
        } else if (['smtpHost', 'smtpPort', 'smtpUser', 'smtpPassword'].includes(key)) {
          group = 'email';
        } else if (['cloudinaryCloudName', 'cloudinaryApiKey', 'cloudinaryApiSecret'].includes(key)) {
          group = 'storage';
        } else if (['emailNotifications', 'newUserNotification', 'orderNotification', 'leadNotification'].includes(key)) {
          group = 'notifications';
        }

        return {
          key,
          value: String(value),
          type,
          group,
        };
      });

      await api.post('/settings/bulk', { settings: settingsToSave });

      setOriginalSettings(settings);
      setHasChanges(false);
      toast.success("Settings saved successfully");
    } catch (error: unknown) {
      console.error('Failed to save settings:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save settings";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(originalSettings);
    setHasChanges(false);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchSettings();
  };

  if (isInitialLoading) {
    return (
      <AdminLayout title="Settings">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
            <p className="text-slate-600">Loading settings...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-600">Manage your application settings</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            {hasChanges && (
              <button
                onClick={handleReset}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Reset
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {hasChanges && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800 text-sm">
            You have unsaved changes. Click &quot;Save Changes&quot; to persist them.
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === tab.id
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            >
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900">General Settings</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Site URL
                      </label>
                      <input
                        type="url"
                        value={settings.siteUrl}
                        onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Site Description
                    </label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Support Email
                      </label>
                      <input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={settings.contactPhone}
                        onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <hr className="border-slate-200" />

                  <h3 className="text-md font-semibold text-slate-900">Social Media Links</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: "facebook", label: "Facebook" },
                      { key: "twitter", label: "Twitter" },
                      { key: "instagram", label: "Instagram" },
                      { key: "linkedin", label: "LinkedIn" },
                      { key: "youtube", label: "YouTube" },
                    ].map((social) => (
                      <div key={social.key}>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {social.label}
                        </label>
                        <input
                          type="url"
                          value={settings[social.key as keyof typeof settings] as string}
                          onChange={(e) => setSettings({ ...settings, [social.key]: e.target.value })}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "email" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900">Email Settings (SMTP)</h2>
                  <p className="text-slate-600 text-sm">Configure your email server for sending notifications.</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={settings.smtpHost}
                        onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                        placeholder="smtp.example.com"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        SMTP Port
                      </label>
                      <input
                        type="text"
                        value={settings.smtpPort}
                        onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                        placeholder="587"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        SMTP Username
                      </label>
                      <input
                        type="text"
                        value={settings.smtpUser}
                        onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        SMTP Password
                      </label>
                      <input
                        type="password"
                        value={settings.smtpPassword}
                        onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                    Test Email Configuration
                  </button>
                </div>
              )}

              {activeTab === "storage" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900">Cloud Storage (Cloudinary)</h2>
                  <p className="text-slate-600 text-sm">Configure Cloudinary for image and media storage.</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Cloud Name
                      </label>
                      <input
                        type="text"
                        value={settings.cloudinaryCloudName}
                        onChange={(e) => setSettings({ ...settings, cloudinaryCloudName: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        API Key
                      </label>
                      <input
                        type="text"
                        value={settings.cloudinaryApiKey}
                        onChange={(e) => setSettings({ ...settings, cloudinaryApiKey: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        API Secret
                      </label>
                      <input
                        type="password"
                        value={settings.cloudinaryApiSecret}
                        onChange={(e) => setSettings({ ...settings, cloudinaryApiSecret: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                    Test Connection
                  </button>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900">Notification Settings</h2>
                  <p className="text-slate-600 text-sm">Configure when and how you receive notifications.</p>

                  <div className="space-y-4">
                    {[
                      { key: "emailNotifications", label: "Email Notifications", desc: "Receive important updates via email" },
                      { key: "newUserNotification", label: "New User Registration", desc: "Get notified when a new user registers" },
                      { key: "orderNotification", label: "New Orders", desc: "Get notified when a new order is placed" },
                      { key: "leadNotification", label: "New Leads", desc: "Get notified when a new lead is submitted" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-medium text-slate-900">{item.label}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-slate-900">Security Settings</h2>
                  <p className="text-slate-600 text-sm">Manage security and authentication settings.</p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <h3 className="font-medium text-slate-900 mb-2">Change Admin Password</h3>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl">
                      <h3 className="font-medium text-slate-900 mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-slate-600 mb-3">Add an extra layer of security to your account.</p>
                      <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="p-4 bg-red-50 rounded-xl">
                      <h3 className="font-medium text-red-900 mb-2">Danger Zone</h3>
                      <p className="text-sm text-red-600 mb-3">Irreversible and destructive actions.</p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete All Data
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}