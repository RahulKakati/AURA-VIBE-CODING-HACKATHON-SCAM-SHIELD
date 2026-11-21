'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getScanHistory,
  clearScanHistory,
  computeDashboardMetrics,
  saveScanToHistory,
  DashboardMetrics,
} from '@/lib/storage';
import { ScanHistoryItem } from '@/lib/types';
import ReportModal from '@/components/ReportModal';
import { SAMPLE_SCENARIOS } from '@/lib/samples';
import { runHeuristicAnalysis } from '@/lib/heuristics';
import {
  ShieldAlert,
  ShieldCheck,
  BarChart3,
  Trash2,
  Download,
  AlertTriangle,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function DashboardPage() {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalScans: 0,
    threatsDetected: 0,
    safeIdentified: 0,
    mediumRisk: 0,
    avgRiskScore: 0,
    categoryCounts: {},
    riskLevelCounts: { safe: 0, low: 0, medium: 0, high: 0, critical: 0 },
  });
  const [selectedScan, setSelectedScan] = useState<ScanHistoryItem | null>(null);

  const loadData = () => {
    const items = getScanHistory();
    setHistory(items);
    setMetrics(computeDashboardMetrics(items));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your local scan history?')) {
      clearScanHistory();
      loadData();
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `scamshield-scan-history-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Helper for judges/users to quickly populate dashboard with sample data if empty
  const handlePopulateSampleSession = () => {
    // Run heuristic analysis on 4 sample scenarios to produce real data
    const sampleIds = ['sbi-kyc-scam', 'upi-cashback-pin', 'wfh-telegram-scam', 'legit-bank-otp'];
    for (const id of sampleIds) {
      const s = SAMPLE_SCENARIOS.find((item) => item.id === id);
      if (s) {
        const res = runHeuristicAnalysis(s.content, s.type);
        saveScanToHistory(res, s.type);
      }
    }
    loadData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-cyber-border/70">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyber-cyan uppercase tracking-wider">
              Real-Time Session Telemetry
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Security Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real session analytics, threat classification distribution, and local audit trail.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {history.length > 0 && (
            <>
              <button
                onClick={handleExportJson}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border hover:border-slate-500 text-xs text-slate-300 hover:text-white transition-all"
              >
                <Download className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Export JSON Log</span>
              </button>

              <button
                onClick={handleClearHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-border hover:border-red-500/50 text-xs text-slate-300 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Session</span>
              </button>
            </>
          )}

          <Link
            href="/scanner"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-bold text-xs hover:opacity-95 shadow-md shadow-cyber-cyan/20"
          >
            <Zap className="w-3.5 h-3.5 fill-cyber-darkest" />
            <span>New Scan</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Scans */}
        <div className="p-5 rounded-2xl bg-cyber-darker border border-cyber-border space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Scans in Session
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white font-mono">
              {metrics.totalScans}
            </span>
            <span className="text-xs text-cyber-cyan font-medium">Session Active</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Stored locally in browser session
          </p>
        </div>

        {/* Card 2: Threats Detected */}
        <div className="p-5 rounded-2xl bg-cyber-darker border border-cyber-border space-y-2">
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            Threats Caught (High/Critical)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-red-400 font-mono">
              {metrics.threatsDetected}
            </span>
            <span className="text-xs text-red-400/80 font-medium">
              {metrics.totalScans > 0
                ? `${Math.round((metrics.threatsDetected / metrics.totalScans) * 100)}%`
                : '0%'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Urgent action recommended
          </p>
        </div>

        {/* Card 3: Safe Messages */}
        <div className="p-5 rounded-2xl bg-cyber-darker border border-cyber-border space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Safe Communications
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-emerald-400 font-mono">
              {metrics.safeIdentified}
            </span>
            <span className="text-xs text-emerald-400/80 font-medium">
              {metrics.totalScans > 0
                ? `${Math.round((metrics.safeIdentified / metrics.totalScans) * 100)}%`
                : '0%'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Benign or low-risk content
          </p>
        </div>

        {/* Card 4: Average Risk Score */}
        <div className="p-5 rounded-2xl bg-cyber-darker border border-cyber-border space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Average Risk Score
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white font-mono">
              {metrics.avgRiskScore}
              <span className="text-sm font-normal text-slate-400">/100</span>
            </span>
            <span className="text-xs text-slate-400 font-medium">Aggregated</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Normalized across all scanned items
          </p>
        </div>
      </div>

      {/* Two Column: Threat Distribution & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Distribution Card */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-cyber-darker border border-cyber-border space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyber-cyan" />
              Risk Level Distribution
            </h3>
            <span className="text-xs text-slate-400 font-mono">Session Totals</span>
          </div>

          <div className="space-y-3">
            {/* Critical */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-400 font-semibold">Critical Threat (Score 85–100)</span>
                <span className="text-slate-300 font-mono">{metrics.riskLevelCounts.critical}</span>
              </div>
              <div className="w-full bg-cyber-card rounded-full h-2 overflow-hidden">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${metrics.totalScans ? (metrics.riskLevelCounts.critical / metrics.totalScans) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* High */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-orange-400 font-semibold">High Risk (Score 65–84)</span>
                <span className="text-slate-300 font-mono">{metrics.riskLevelCounts.high}</span>
              </div>
              <div className="w-full bg-cyber-card rounded-full h-2 overflow-hidden">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${metrics.totalScans ? (metrics.riskLevelCounts.high / metrics.totalScans) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-400 font-semibold">Suspicious / Medium (Score 35–64)</span>
                <span className="text-slate-300 font-mono">{metrics.riskLevelCounts.medium}</span>
              </div>
              <div className="w-full bg-cyber-card rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-400 h-2 rounded-full transition-all"
                  style={{
                    width: `${metrics.totalScans ? (metrics.riskLevelCounts.medium / metrics.totalScans) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Safe / Low */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-400 font-semibold">Safe / Low Risk (Score 0–34)</span>
                <span className="text-slate-300 font-mono">
                  {metrics.riskLevelCounts.safe + metrics.riskLevelCounts.low}
                </span>
              </div>
              <div className="w-full bg-cyber-card rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-400 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      metrics.totalScans
                        ? ((metrics.riskLevelCounts.safe + metrics.riskLevelCounts.low) / metrics.totalScans) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Threat Category Breakdown */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-cyber-darker border border-cyber-border space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyber-cyan" />
              Detected Threat Categories
            </h3>
            <span className="text-xs text-slate-400 font-mono">Distribution</span>
          </div>

          {Object.keys(metrics.categoryCounts).length > 0 ? (
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {Object.entries(metrics.categoryCounts).map(([cat, count]) => (
                <div
                  key={cat}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-cyber-card/60 border border-cyber-border text-xs"
                >
                  <span className="text-slate-300 font-medium truncate max-w-xs">{cat}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="px-2 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan font-bold border border-cyber-cyan/20">
                      {count} {count === 1 ? 'scan' : 'scans'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <p>No threat categories recorded yet in this session.</p>
              <p className="text-slate-400">Scan messages to populate real category telemetry.</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Scan History Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyber-cyan" />
            Recent Scan History ({history.length})
          </h3>
          <span className="text-xs text-slate-400">Click any row to view full incident report</span>
        </div>

        {history.length > 0 ? (
          <div className="rounded-2xl bg-cyber-darker border border-cyber-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-cyber-card/80 border-b border-cyber-border text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Submitted Snippet</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Risk Level</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border/60">
                  {history.map((item) => {
                    const isThreat = item.risk_level === 'CRITICAL' || item.risk_level === 'HIGH';
                    const isMed = item.risk_level === 'MEDIUM';

                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedScan(item)}
                        className="hover:bg-cyber-card/60 transition-colors cursor-pointer group"
                      >
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                          {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3 capitalize whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-cyber-card border border-cyber-border text-[10px] font-semibold text-slate-300">
                            {item.input_type || 'message'}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-w-xs truncate font-mono text-[11px] text-slate-200">
                          {item.target_text}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-cyber-cyan font-medium">
                          {item.threat_category}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              isThreat
                                ? 'bg-red-500/15 text-red-400 border-red-500/30'
                                : isMed
                                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                                : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            }`}
                          >
                            {item.risk_level}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold font-mono text-white whitespace-nowrap">
                          {item.risk_score}/100
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyber-cyan group-hover:underline">
                            <span>Report</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="p-10 rounded-2xl bg-cyber-darker border border-cyber-border text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyber-card border border-cyber-border flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 text-slate-500" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">No Scans Recorded in This Session</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Run your first message, screenshot, or URL scan to view live session telemetry and risk distribution.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/scanner"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-bold text-xs"
              >
                Scan a Message
              </Link>
              <button
                onClick={handlePopulateSampleSession}
                className="px-4 py-2.5 rounded-xl bg-cyber-card border border-cyber-border text-slate-300 hover:text-white text-xs font-medium"
              >
                Load Sample Test Scans
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {selectedScan && (
        <ReportModal
          isOpen={true}
          onClose={() => setSelectedScan(null)}
          result={selectedScan}
        />
      )}
    </div>
  );
}
