"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  BookOpen,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Bell,
  Users,
} from "lucide-react";
import { UserLayout } from "@/components/user/UserLayout";
import { useAuth } from "@/providers/auth-provider";

// ============================================
// Types
// ============================================

interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  type: "class" | "workshop" | "exam" | "event";
  date: string;
  startTime: string;
  endTime: string;
  instructor?: string;
  location?: string;
  isOnline: boolean;
  meetingLink?: string;
}

// ============================================
// Helper Functions
// ============================================

function getEventTypeConfig(type: string) {
  switch (type) {
    case "class":
      return { color: "bg-blue-500", bgColor: "bg-blue-50", textColor: "text-blue-700" };
    case "workshop":
      return { color: "bg-purple-500", bgColor: "bg-purple-50", textColor: "text-purple-700" };
    case "exam":
      return { color: "bg-red-500", bgColor: "bg-red-50", textColor: "text-red-700" };
    case "event":
      return { color: "bg-green-500", bgColor: "bg-green-50", textColor: "text-green-700" };
    default:
      return { color: "bg-slate-500", bgColor: "bg-slate-50", textColor: "text-slate-700" };
  }
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
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
// Schedule Page Component
// ============================================

export default function SchedulePage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<"calendar" | "list">("calendar");

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock data - will be replaced with actual API
      setEvents([
        {
          id: "1",
          title: "Introduction to Arduino",
          description: "Learn the basics of Arduino programming",
          type: "class",
          date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-15`,
          startTime: "10:00",
          endTime: "11:30",
          instructor: "Dr. Sharma",
          isOnline: true,
          meetingLink: "https://meet.example.com/abc123",
        },
        {
          id: "2",
          title: "Robotics Workshop",
          description: "Hands-on session building your first robot",
          type: "workshop",
          date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-18`,
          startTime: "14:00",
          endTime: "17:00",
          instructor: "Mr. Patel",
          location: "Lab 3, Building A",
          isOnline: false,
        },
        {
          id: "3",
          title: "Module 1 Assessment",
          description: "Test your understanding of basic concepts",
          type: "exam",
          date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-22`,
          startTime: "09:00",
          endTime: "10:00",
          isOnline: true,
        },
        {
          id: "4",
          title: "STEM Innovation Day",
          description: "Annual showcase of student projects",
          type: "event",
          date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-25`,
          startTime: "10:00",
          endTime: "16:00",
          location: "Main Auditorium",
          isOnline: false,
        },
      ]);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentMonth, currentYear]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const selectedDateEvents = selectedDate
    ? getEventsForDate(selectedDate.getDate())
    : [];

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  if (isLoading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Schedule</h1>
            <p className="text-slate-600 mt-1">View your upcoming classes and events</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView("calendar")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === "calendar"
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === "list"
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              List
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-slate-900">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
              </div>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Day Names */}
              <div className="grid grid-cols-7 mb-2">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-slate-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells before first day */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-20" />
                ))}

                {/* Days of month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDate(day);
                  const isToday =
                    day === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear();
                  const isSelected =
                    selectedDate &&
                    day === selectedDate.getDate() &&
                    currentMonth === selectedDate.getMonth() &&
                    currentYear === selectedDate.getFullYear();

                  return (
                    <button
                      key={day}
                      onClick={() =>
                        setSelectedDate(new Date(currentYear, currentMonth, day))
                      }
                      className={`h-20 p-1 rounded-lg border transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : isToday
                          ? "border-primary/50 bg-primary/5"
                          : "border-transparent hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`text-sm font-medium mb-1 ${
                          isToday ? "text-primary" : "text-slate-700"
                        }`}
                      >
                        {day}
                      </div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((event) => {
                          const config = getEventTypeConfig(event.type);
                          return (
                            <div
                              key={event.id}
                              className={`text-xs truncate px-1 py-0.5 rounded ${config.bgColor} ${config.textColor}`}
                            >
                              {event.title}
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-slate-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Today Button */}
            <div className="p-4 border-t border-slate-200">
              <button
                onClick={goToToday}
                className="w-full py-2 text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
              >
                Go to Today
              </button>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Selected Date Events */}
            {selectedDate && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                <h3 className="font-semibold text-slate-900 mb-4">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => {
                      const config = getEventTypeConfig(event.type);
                      return (
                        <div
                          key={event.id}
                          className={`p-3 rounded-lg border-l-4 ${config.bgColor}`}
                          style={{ borderLeftColor: config.color.replace("bg-", "") }}
                        >
                          <h4 className="font-medium text-slate-900">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                            <Clock className="w-4 h-4" />
                            {event.startTime} - {event.endTime}
                          </div>
                          {event.isOnline ? (
                            <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                              <Video className="w-4 h-4" />
                              Online
                            </div>
                          ) : event.location ? (
                            <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No events scheduled</p>
                )}
              </div>
            )}

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Upcoming Events
              </h3>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.map((event) => {
                    const config = getEventTypeConfig(event.type);
                    return (
                      <div
                        key={event.id}
                        className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${config.color}`}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900 truncate">
                            {event.title}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            at {event.startTime}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No upcoming events</p>
              )}
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Event Types</h3>
              <div className="space-y-2">
                {[
                  { type: "class", label: "Classes" },
                  { type: "workshop", label: "Workshops" },
                  { type: "exam", label: "Exams" },
                  { type: "event", label: "Events" },
                ].map(({ type, label }) => {
                  const config = getEventTypeConfig(type);
                  return (
                    <div key={type} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${config.color}`} />
                      <span className="text-sm text-slate-600">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </UserLayout>
  );
}
