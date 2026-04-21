"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Trophy,
  Award,
  Star,
  Medal,
  Target,
  Zap,
  BookOpen,
  Clock,
  CheckCircle,
  Lock,
  RefreshCw,
  Download,
  ExternalLink,
} from "lucide-react";
import { UserLayout } from "@/components/user/UserLayout";
import { useAuth } from "@/providers/auth-provider";
import { apiClient } from "@/lib/api";

// ============================================
// Types
// ============================================

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "learning" | "completion" | "streak" | "special";
  points: number;
  earnedAt?: string;
  isLocked: boolean;
  progress: number;
  maxProgress?: number;
}

interface Certificate {
  id: string;
  title: string;
  courseName: string;
  certificateNumber: string;
  certificateUrl?: string;
  issuedAt: string;
  programId?: string;
}

interface AchievementStats {
  total: number;
  earned: number;
  points: number;
}

// ============================================
// Achievement Icon Component
// ============================================

function AchievementIcon({ icon, isLocked }: { icon: string; isLocked: boolean }) {
  const iconClass = isLocked ? "text-slate-400" : "text-amber-500";
  
  switch (icon) {
    case "trophy":
      return <Trophy className={`w-8 h-8 ${iconClass}`} />;
    case "star":
      return <Star className={`w-8 h-8 ${iconClass}`} />;
    case "medal":
      return <Medal className={`w-8 h-8 ${iconClass}`} />;
    case "target":
      return <Target className={`w-8 h-8 ${iconClass}`} />;
    case "zap":
      return <Zap className={`w-8 h-8 ${iconClass}`} />;
    case "book":
      return <BookOpen className={`w-8 h-8 ${iconClass}`} />;
    case "clock":
      return <Clock className={`w-8 h-8 ${iconClass}`} />;
    default:
      return <Award className={`w-8 h-8 ${iconClass}`} />;
  }
}

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ============================================
// Achievements Page Component
// ============================================

export default function AchievementsPage() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [stats, setStats] = useState<AchievementStats>({ total: 0, earned: 0, points: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"achievements" | "certificates">("achievements");
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (showRefreshState = false) => {
    if (showRefreshState) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);
    
    try {
      // Fetch achievements, stats, and certificates in parallel
      const [achievementsData, statsData, certificatesData] = await Promise.all([
        apiClient.get<Achievement[]>('/achievements/me'),
        apiClient.get<AchievementStats>('/achievements/me/stats'),
        apiClient.get<Certificate[]>('/achievements/certificates/me'),
      ]);
      
      setAchievements(achievementsData || []);
      setStats(statsData || { total: 0, earned: 0, points: 0 });
      setCertificates(certificatesData || []);
    } catch (err: unknown) {
      console.error("Error fetching achievements:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load achievements";
      setError(errorMessage);
      
      // Set empty data on error
      setAchievements([]);
      setCertificates([]);
      setStats({ total: 0, earned: 0, points: 0 });
      
      if (showRefreshState) {
        toast.error("Failed to refresh data");
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  const handleRefresh = () => {
    fetchData(true);
  };

  const earnedAchievements = achievements.filter((a) => !a.isLocked);
  const lockedAchievements = achievements.filter((a) => a.isLocked);

  if (isLoading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading achievements...</p>
          </div>
        </div>
      </UserLayout>
    );
  }

  if (error && achievements.length === 0) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700">Unable to load achievements</h3>
            <p className="text-slate-500 mt-1 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Achievements & Certificates
            </h1>
            <p className="text-slate-600 mt-1">
              Track your progress and celebrate your accomplishments
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Trophy className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.earned}</p>
                <p className="text-sm text-slate-600">Earned</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                <p className="text-sm text-slate-600">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{certificates.length}</p>
                <p className="text-sm text-slate-600">Certificates</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.points}</p>
                <p className="text-sm text-slate-600">Points</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === "achievements"
                ? "text-primary"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Achievements
            {activeTab === "achievements" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === "certificates"
                ? "text-primary"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Certificates
            {activeTab === "certificates" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </motion.div>

        {/* Content */}
        {activeTab === "achievements" ? (
          <div className="space-y-6">
            {achievements.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700">No achievements yet</h3>
                <p className="text-slate-500 mt-1">
                  Start learning to unlock achievements and earn points!
                </p>
              </div>
            ) : (
              <>
                {/* Earned Achievements */}
                {earnedAchievements.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Earned ({earnedAchievements.length})
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {earnedAchievements.map((achievement) => (
                        <motion.div
                          key={achievement.id}
                          variants={itemVariants}
                          className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-50 rounded-xl">
                              <AchievementIcon icon={achievement.icon} isLocked={false} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-900">{achievement.title}</h3>
                              <p className="text-sm text-slate-600 mt-1">
                                {achievement.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                  +{achievement.points} pts
                                </span>
                                {achievement.earnedAt && (
                                  <span className="text-xs text-green-600">
                                    Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Locked Achievements */}
                {lockedAchievements.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-slate-400" />
                      In Progress ({lockedAchievements.length})
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {lockedAchievements.map((achievement) => (
                        <motion.div
                          key={achievement.id}
                          variants={itemVariants}
                          className="bg-slate-50 rounded-xl p-4 border border-slate-200"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-slate-100 rounded-xl">
                              <AchievementIcon icon={achievement.icon} isLocked={true} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-700">{achievement.title}</h3>
                              <p className="text-sm text-slate-500 mt-1">
                                {achievement.description}
                              </p>
                              <span className="inline-block text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full mt-2">
                                +{achievement.points} pts
                              </span>
                              {achievement.maxProgress && achievement.maxProgress > 0 && (
                                <div className="mt-3">
                                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>Progress</span>
                                    <span>
                                      {achievement.progress}/{achievement.maxProgress}
                                    </span>
                                  </div>
                                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-primary rounded-full transition-all"
                                      style={{
                                        width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        ) : (
          <motion.div variants={itemVariants}>
            {certificates.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    variants={itemVariants}
                    className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        <Award className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{cert.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{cert.courseName}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Certificate #: {cert.certificateNumber}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Issued on {new Date(cert.issuedAt).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2 mt-4">
                          {cert.certificateUrl ? (
                            <>
                              <a
                                href={cert.certificateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                View
                              </a>
                              <a
                                href={cert.certificateUrl}
                                download
                                className="inline-flex items-center gap-1 px-3 py-1.5 border border-primary text-primary text-sm rounded-lg hover:bg-primary/10 transition-colors"
                              >
                                <Download className="w-3.5 h-3.5" />
                                Download
                              </a>
                            </>
                          ) : (
                            <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors">
                              View Certificate
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700">No certificates yet</h3>
                <p className="text-slate-500 mt-1">
                  Complete courses to earn certificates
                </p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </UserLayout>
  );
}
