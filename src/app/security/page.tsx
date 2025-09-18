"use client";

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

const securityStats = {
  totalVisitors: 247,
  activeVisitors: 42,
  todaysMeetings: 18,
  visitsInProgress: 15,
  overdueVisitors: 3,
  totalMeetings: 156,
};

// Daily visitor trends
const visitorTrends = [
  { date: "Mon", visitors: 45, meetings: 12 },
  { date: "Tue", visitors: 52, meetings: 15 },
  { date: "Wed", visitors: 38, meetings: 8 },
  { date: "Thu", visitors: 65, meetings: 22 },
  { date: "Fri", visitors: 47, meetings: 18 },
  { date: "Sat", visitors: 28, meetings: 6 },
  { date: "Sun", visitors: 15, meetings: 3 },
];

// Location-based analytics
const locationStats = [
  { location: "Main Lobby", count: 89 },
  { location: "Conference Room A", count: 67 },
  { location: "Executive Floor", count: 45 },
  { location: "Research Lab", count: 32 },
  { location: "Cafeteria", count: 28 },
];

import { LucideIcon } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, change, color }: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  color?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color || "text-blue-500"}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-gray-500 mt-1">{change}</p>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default function SecurityDashboard() {
  return (
    <MainLayout role="security" title="Security Dashboard" subtitle="Monitor visitor activity and security metrics">
      <div className="space-y-6">
        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-end"
        >
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Activity className="h-4 w-4 mr-2" />
            Real-time View
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Visitors Today"
            value={securityStats.totalVisitors}
            icon={Users}
            change="+12% from yesterday"
            color="text-blue-500"
          />
          <StatsCard
            title="Active Visitors"
            value={securityStats.activeVisitors}
            icon={UserCheck}
            change="Currently in building"
            color="text-green-500"
          />
          <StatsCard
            title="Today's Meetings"
            value={securityStats.todaysMeetings}
            icon={Calendar}
            change="8 upcoming"
            color="text-purple-500"
          />
          <StatsCard
            title="Overdue Check-outs"
            value={securityStats.overdueVisitors}
            icon={Clock}
            change="Requires attention"
            color="text-red-500"
          />
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity Overview */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-500" />
                      Real-time Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-sm">John Smith checked in</span>
                        </div>
                        <span className="text-xs text-gray-500">2 min ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-sm">Meeting started in Room A</span>
                        </div>
                        <span className="text-xs text-gray-500">5 min ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                          <span className="text-sm">Visitor badge expiring soon</span>
                        </div>
                        <span className="text-xs text-gray-500">8 min ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Security Alerts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-red-500" />
                      Security Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div>
                          <p className="text-sm font-medium text-green-800">All Systems Normal</p>
                          <p className="text-xs text-green-600">No security alerts</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                        <div>
                          <p className="text-sm font-medium text-amber-800">3 Overdue Visitors</p>
                          <p className="text-xs text-amber-600">Check-out reminders sent</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Visitor Trends Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                      Weekly Visitor Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StatsLineChart
                      data={visitorTrends}
                      xKey="date"
                      series={[
                        { dataKey: "visitors", color: "#3B82F6", name: "Visitors" },
                        { dataKey: "meetings", color: "#10B981", name: "Meetings" }
                      ]}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Location Analytics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                      Popular Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StatsBarChart
                      data={locationStats}
                      xKey="location"
                      yKey="count"
                      color="#8B5CF6"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Additional Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Peak Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">10-11 AM</div>
                  <p className="text-sm text-gray-500">Highest visitor traffic</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Stay</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">2.5 hrs</div>
                  <p className="text-sm text-gray-500">Typical visit duration</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Return Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">68%</div>
                  <p className="text-sm text-gray-500">Returning visitors</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Security Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-20 flex flex-col">
                        <Calendar className="h-6 w-6 mb-2" />
                        Daily Report
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col">
                        <Users className="h-6 w-6 mb-2" />
                        Visitor Summary
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col">
                        <Shield className="h-6 w-6 mb-2" />
                        Security Log
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}