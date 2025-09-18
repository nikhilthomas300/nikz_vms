"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsLineChart } from "@/components/charts/line-chart";
import { StatsBarChart } from "@/components/charts/bar-chart";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Activity,
  Calendar,
  BarChart3,
  TrendingUp,
  Shield,
  Clock
} from "lucide-react";
import { mockMeetings, mockLocations, mockVisitors } from "@/lib/data/mockData";

interface SecurityStats {
  totalVisitors: number;
  activeVisitors: number;
  todaysMeetings: number;
  visitsInProgress: number;
  overdueVisitors: number;
  totalMeetings: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const cardHoverVariants = {
  hover: {
    y: -4,
    scale: 1.02,
    transition: { type: "spring" as const, stiffness: 300 },
  },
};

export default function ModernSecurityPortalPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showMeetingDetails, setShowMeetingDetails] = useState(false);

  // Current security user's location
  const currentLocation = mockLocations[0];

  // Filter data by current location
  const locationMeetings = mockMeetings.filter(
    (meeting) => meeting.location.id === currentLocation.id
  );

  const locationVisitors = mockVisitors.filter(
    (visitor) =>
      visitor.meetingId &&
      locationMeetings.some((m) => m.id === visitor.meetingId)
  );

  const todaysMeetings = locationMeetings.filter((meeting) => {
    const today = new Date();
    const meetingDate = new Date(meeting.startTime);
    return meetingDate.toDateString() === today.toDateString();
  });

  const visitsInProgress = locationVisitors.filter(
    (visitor) =>
      visitor.status === "in-meeting" || visitor.status === "checked-in"
  );

  const pendingApprovals = locationMeetings.filter(
    (meeting) => meeting.approvalStatus === "pending"
  );

  const overdueVisitors = locationVisitors.filter(
    (visitor) => visitor.status === "overdue"
  );

  const stats: SecurityStats = {
    totalVisitors: locationVisitors.length,
    activeVisitors: visitsInProgress.length,
    todaysMeetings: todaysMeetings.length,
    visitsInProgress: visitsInProgress.length,
    pendingApprovals: pendingApprovals.length,
    overdueVisitors: overdueVisitors.length,
  };

  const handleApproveMeeting = async (meetingId: string) => {
    console.log(`Approving meeting ${meetingId}`);
  };

  const handleRejectMeeting = async (meetingId: string) => {
    console.log(`Rejecting meeting ${meetingId}`);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getApprovalBadge = (status: Meeting["approvalStatus"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200">
            Pending Review
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <MainLayout
      role="security"
      title="Security Portal"
      subtitle={`Managing ${currentLocation.name}`}
    >
      <motion.div
        className="min-h-screen bg-gradient-to-br from-slate-50/80 via-emerald-50/40 to-teal-50/30 p-4 sm:p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Security Statistics */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6"
            variants={itemVariants}
          >
            {/* Active Visitors */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/20 border-emerald-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">
                          Active
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.activeVisitors}
                      </p>
                      <p className="text-xs text-emerald-600 font-medium">
                        Visitors on-site
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 rounded-full -translate-y-4 translate-x-4"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pending Approvals */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50/30 to-amber-100/20 border-amber-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                          <Bell className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">
                          Pending
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.pendingApprovals}
                      </p>
                      <p className="text-xs text-amber-600 font-medium">
                        Need approval
                      </p>
                    </div>
                    {stats.pendingApprovals > 0 && (
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full -translate-y-4 translate-x-4"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Today's Meetings */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">
                          Today
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.todaysMeetings}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        Meetings
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full -translate-y-4 translate-x-4"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* In Progress */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 border-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                          <Activity className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">
                          Active
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.visitsInProgress}
                      </p>
                      <p className="text-xs text-purple-600 font-medium">
                        In meeting
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-purple-600/10 rounded-full -translate-y-4 translate-x-4"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Total Visitors */}
            <motion.div variants={cardHoverVariants} whileHover="hover">
              <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-gray-100/20 border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center shadow-md">
                          <UserCheck className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">
                          Total
                        </p>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.totalVisitors}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">
                        All visitors
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-400/10 to-gray-600/10 rounded-full -translate-y-4 translate-x-4"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Modern Content Tabs */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-emerald-100/20 overflow-hidden">
              <Tabs defaultValue="approvals" className="w-full">
                <div className="border-b border-gray-100/50 px-6 sm:px-8 pt-6">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-[500px] bg-gray-50/50 backdrop-blur-sm rounded-2xl p-1">
                    <TabsTrigger
                      value="approvals"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200"
                    >
                      Approvals{" "}
                      {stats.pendingApprovals > 0 && (
                        <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="active"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200"
                    >
                      Active
                    </TabsTrigger>
                    <TabsTrigger
                      value="meetings"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200"
                    >
                      Meetings
                    </TabsTrigger>
                    <TabsTrigger
                      value="monitor"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-xl transition-all duration-200"
                    >
                      Monitor
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 sm:p-8">
                  <TabsContent value="approvals" className="space-y-6 mt-0">
                    {/* Approval Queue */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Pending Approvals
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Awaiting review</span>
                        </div>
                      </div>

                      {pendingApprovals.length > 0 ? (
                        <div className="space-y-4">
                          {pendingApprovals.map((meeting, index) => (
                            <motion.div
                              key={meeting.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                            >
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                                    <Bell className="h-6 w-6 text-amber-600" />
                                  </div>
                                  <div className="space-y-2 flex-1">
                                    <h4 className="font-semibold text-gray-900 text-lg">
                                      {meeting.subject}
                                    </h4>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                      <span className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        {meeting.employee.name}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {formatDateTime(
                                          new Date(meeting.startTime)
                                        )}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Building className="h-4 w-4" />
                                        {meeting.room.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {getApprovalBadge(meeting.approvalStatus)}
                                      <span className="text-xs text-gray-500">
                                        {meeting.visitors?.length || 0}{" "}
                                        visitor(s) expected
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleRejectMeeting(meeting.id)
                                    }
                                    className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                                  >
                                    <X className="h-4 w-4" />
                                    Reject
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleApproveMeeting(meeting.id)
                                    }
                                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                  >
                                    <Check className="h-4 w-4" />
                                    Approve
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50"
                        >
                          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            All caught up!
                          </h3>
                          <p className="text-gray-600">
                            No pending approvals at this time
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="active" className="space-y-6 mt-0">
                    <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50">
                      <Activity className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Active Visits Monitor
                      </h3>
                      <p className="text-gray-600">
                        Real-time visitor tracking coming soon
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="meetings" className="space-y-6 mt-0">
                    <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50">
                      <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Meeting Overview
                      </h3>
                      <p className="text-gray-600">
                        Comprehensive meeting management coming soon
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="monitor" className="space-y-6 mt-0">
                    <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50">
                      <Camera className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Security Monitor
                      </h3>
                      <p className="text-gray-600">
                        Live surveillance integration coming soon
                      </p>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Meeting Details Dialog */}
      <Dialog open={showMeetingDetails} onOpenChange={setShowMeetingDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Meeting Details</DialogTitle>
            <DialogDescription>
              Review meeting information and visitor details
            </DialogDescription>
          </DialogHeader>
          {selectedMeeting && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-700">Subject:</label>
                  <p className="text-gray-900">{selectedMeeting.subject}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Host:</label>
                  <p className="text-gray-900">
                    {selectedMeeting.employee.name}
                  </p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">
                    Date & Time:
                  </label>
                  <p className="text-gray-900">
                    {formatDateTime(new Date(selectedMeeting.startTime))}
                  </p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Location:</label>
                  <p className="text-gray-900">{selectedMeeting.room.name}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowMeetingDetails(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => handleApproveMeeting(selectedMeeting.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  Approve Meeting
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
