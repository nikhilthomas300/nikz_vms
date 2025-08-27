"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building,
  Shield,
  Users,
  Calendar,
  CheckCircle2,
  Zap,
  Globe,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const roleCards = [
  {
    title: "Host",
    description:
      "Manage visitor appointments and coordinate meetings with ease.",
    icon: Users,
    href: "/host",
    gradient: "from-blue-500 to-cyan-500",
    features: ["Schedule Visits", "Guest Management", "Notifications"],
  },
  {
    title: "Security",
    description: "Monitor all visitor activities and ensure facility security.",
    icon: Shield,
    href: "/security",
    gradient: "from-red-500 to-pink-500",
    features: ["Visitor Monitoring", "Access Control", "Security Alerts"],
  },
  {
    title: "Admin",
    description: "Complete system management with analytics and reports.",
    icon: Building,
    href: "/admin",
    gradient: "from-purple-500 to-indigo-500",
    features: ["System Analytics", "User Management", "Reports"],
  },
  {
    title: "Visitor",
    description: "Seamless self-service experience for guests.",
    icon: Calendar,
    href: "/visitor",
    gradient: "from-green-500 to-emerald-500",
    features: ["Self Check-in", "Visit Tracking", "Digital Badge"],
  },
];

const features = [
  {
    icon: CheckCircle2,
    title: "Quick Check-in",
    description: "Efficient visitor registration with QR codes.",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Real-time monitoring and security alerts.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Instant notifications for all stakeholders.",
  },
  {
    icon: Globe,
    title: "Cloud-based",
    description: "Secure cloud platform with global access.",
  },
];

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Visitor Management System
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Enterprise Solution
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Digital Clock */}
              <motion.div
                className="hidden md:flex flex-col items-end text-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {currentTime && (
                  <>
                    <div className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                      {formatTime(currentTime)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(currentTime)}
                    </div>
                  </>
                )}
              </motion.div>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Compact and Impactful */}
      <section className="pt-16 pb-6 sm:pt-20 sm:pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <Badge
                variant="outline"
                className="mb-4 px-4 py-1.5 text-blue-600 border-blue-200 bg-blue-50/50 dark:bg-blue-950/50 rounded-full"
              >
                <Zap className="h-4 w-4 mr-2" />
                Next-Generation Platform
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Modern Visitor
                </span>
                <br />
                <span className="text-slate-900 dark:text-white">
                  Management
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Streamlined visitor management portal for hosts, security,
                administrators, and visitors with real-time tracking and
                seamless integration.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
            >
              <Link href="/kiosk">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
                >
                  <UserCheck className="mr-3 h-5 w-5" />
                  Visitor Check-in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800 min-w-[200px]"
              >
                <Globe className="mr-3 h-5 w-5" />
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Role Cards - Enhanced Layout */}
      <section className="py-8 sm:py-12 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="mb-4 px-4 py-1.5 rounded-full"
              >
                <Users className="h-4 w-4 mr-2" />
                Access by Role
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Choose Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Access Level
                </span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Dedicated interfaces designed for different user roles and
                permissions.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {roleCards.map((role, index) => (
              <motion.div
                key={role.title}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={role.href}>
                  <Card className="group h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="pb-4 relative">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${role.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <role.icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                        {role.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {role.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2 mb-6">
                        {role.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-sm text-slate-600 dark:text-slate-300"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full h-11 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 rounded-lg">
                        Enter Dashboard
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="mb-4 px-4 py-1.5 rounded-full"
              >
                <Zap className="h-4 w-4 mr-2" />
                Key Features
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Comprehensive Visitor
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Management
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Secure, efficient visitor management with real-time monitoring,
                digital check-in, and comprehensive reporting for modern
                workplaces.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - More Compact */}
      <footer className="py-6 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-3 sm:mb-0">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-semibold">VMS Enterprise</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 Visitor Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
