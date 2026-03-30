import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  FolderKanban,
  Layers,
  FlaskConical,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type React from "react";
import Layout from "@/layout";
import Dot from "@/assets/icons/dot.svg?react";

//  Static data

const stats = [
  {
    label: "Total Projects",
    value: "6",
    icon: FolderKanban,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    label: "Active Projects",
    value: "5",
    icon: Layers,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
  },
  {
    label: "Total Test Cases",
    value: "1,036",
    icon: FlaskConical,
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-50",
  },
  {
    label: "Avg Pass",
    value: "83.8%",
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    label: "Avg Fail",
    value: "16.2%",
    icon: TrendingDown,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
  },
];

type RunStatus = "Passed" | "Failed" | "Pending";

const recentRuns: {
  name: string;
  runId: string;
  tests: number;
  duration: string;
  env: string;
  status: RunStatus;
}[] = [
  {
    name: "Login Flow",
    runId: "RUN-2947",
    tests: 24,
    duration: "8m 32s",
    env: "Staging",
    status: "Passed",
  },
  {
    name: "Payment Gateway",
    runId: "RUN-2946",
    tests: 16,
    duration: "6m 15s",
    env: "Production",
    status: "Passed",
  },
  {
    name: "User Registration",
    runId: "RUN-2945",
    tests: 12,
    duration: "3m 43s",
    env: "Staging",
    status: "Failed",
  },
  {
    name: "API Integration",
    runId: "RUN-2944",
    tests: 14,
    duration: "8m 23s",
    env: "QA",
    status: "Passed",
  },
  {
    name: "Dashboard UI",
    runId: "RUN-2943",
    tests: 16,
    duration: "9m 12s",
    env: "Staging",
    status: "Pending",
  },
];

type ActivityType = "success" | "error" | "warning";

const recentActivity: { label: string; time: string; type: ActivityType }[] = [
  {
    label: "Regression Suite - Production",
    time: "5 min ago",
    type: "success",
  },
  {
    label: "Excel Batch Import Completed",
    time: "12 min ago",
    type: "success",
  },
  {
    label: "API Integration Tests - Staging",
    time: "18 min ago",
    type: "warning",
  },
  { label: "Test Case TC-1456 Approved", time: "25 min ago", type: "success" },
  { label: "Smoke Test Suite - Dev", time: "30 min ago", type: "error" },
  { label: "Database Backup Successful", time: "35 min ago", type: "success" },
  { label: "UI Performance Benchmarking", time: "40 min ago", type: "warning" },
  { label: "Security Audit Complete", time: "60 min ago", type: "success" },
];

type AlertSeverity = "HIGH" | "MEDIUM" | "LOW";

const alerts: { severity: AlertSeverity; message: string; action: string }[] = [
  {
    severity: "HIGH",
    message: "3 test cases have failed consecutively in production",
    action: "View Details",
  },
  {
    severity: "MEDIUM",
    message: "Migration batch #42 requires manual review",
    action: "Review Now",
  },
  {
    severity: "LOW",
    message: "15 test cases pending approval",
    action: "Review Queue",
  },
];

//  Helpers

const statusConfig: Record<
  RunStatus,
  { color: string; bg: string; icon: React.ReactNode }
> = {
  Passed: { color: "text-[#008236]", bg: "bg-[#F0FDF4]",  icon: <CheckCircle2 size={14} /> },
  Failed: { color: "text-[#C10007]",     bg: "bg-[#FEF2F2]",      icon: <XCircle size={14} /> },
  Pending: { color: "text-[#A65F00]",  bg: "bg-[#FEFCE8]",   icon: <Clock size={14} /> },
};

const activityIcon: Record<ActivityType, React.ReactNode> = {
  success: (
    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
  ),
  error: <XCircle size={14} className="text-red-500 shrink-0 mt-0.5" />,
  warning: <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />,
};

const severityStyle: Record<AlertSeverity, string> = {
  HIGH: "bg-red-500 text-white",
  MEDIUM: "bg-amber-400 text-white",
  LOW: "bg-emerald-500 text-white",
};

//  Component

export default function Dashboard() {
  return (
    <Layout>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Welcome back! Here is the summary
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-white p-4"
            >
              <div
                className={`inline-flex items-center justify-center size-8 rounded-lg mb-3 ${s.iconBg}`}
              >
                <Icon size={16} className={s.iconColor} />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Recent Test Runs */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-white p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Test Runs
            </h2>
            <p className="text-xs text-muted-foreground">
              Latest execution results across all suites
            </p>
          </div>
          <div className="space-y-1">
            {recentRuns.map((run) => {
              const { color, bg, icon } = statusConfig[run.status];
              return (
                <div
                  key={run.runId}
                  className="flex items-center justify-between py-2.5 rounded-lg px-2 border border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className={`mt-0.5 shrink-0 ${color}`}>{<Dot />}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-tight">
                        {run.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {run.runId} &nbsp;&nbsp; {run.tests} tests &nbsp;&nbsp;{" "}
                        {run.duration} &nbsp;&nbsp;
                        <span className="text-primary font-medium">
                          {run.env}
                        </span>
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold flex items-center pl-2 p-1 rounded-lg  gap-1 ${color} ${bg}`}
                  >
                    {icon}
                    {run.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-white p-5 flex flex-col">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Activity
            </h2>
            <p className="text-xs text-muted-foreground">
              Latest system events
            </p>
          </div>
          <div className="flex-1 space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                {activityIcon[a.type]}
                <div>
                  <p className="text-xs text-foreground leading-snug">
                    {a.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 flex items-center gap-1 text-xs font-medium text-primary hover:underline self-end">
            View All Activity <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Alerts */}
      <div className="rounded-xl border border-border bg-white p-5">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-foreground">
            Active Alerts &amp; Notifications
          </h2>
          <p className="text-xs text-muted-foreground">Action required</p>
        </div>
        <div className="space-y-2">
          {alerts.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3 bg-muted/30"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${severityStyle[a.severity]}`}
                >
                  {a.severity}
                </span>
                <p className="text-sm text-foreground">{a.message}</p>
              </div>
              <button className="text-xs font-medium text-primary hover:underline whitespace-nowrap ml-4">
                {a.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
