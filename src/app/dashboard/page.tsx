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
  Clock,
  ArrowRight,
  ScanLine,
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
    if (confirm('Are you sure you want to clear your local session history?')) {
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

  const handlePopulateSampleSession = () => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
            Session Security Telemetry
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Security Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real session telemetry, risk distribution metrics, and local audit trail.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {history.length > 0 && (
            <>
              <button
                onClick={handleExportJson}
                className="btn-secondary text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={handleClearHistory}
                className="btn-secondary text-xs text-slate-400 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </>
          )}

          <Link
            href="/scanner"
            className="btn-primary text-xs"
          >
            <ScanLine className="w-3.5 h-3.5" />
            <span>New Scan</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="card p-5 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Scans
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white font-mono">
              {metrics.totalScans}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Session</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Stored locally in browser session
          </p>
        </div>

        {/* Card 2 */}
        <div className="card p-5 space-y-2 border-red-500/25">
          <span className="text-[11px] font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            Threats Caught
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-red-400 font-mono">
              {metrics.threatsDetected}
            </span>
            <span className="text-[11px] text-red-400/80 font-mono">
              {metrics.totalScans > 0
                ? `${Math.round((metrics.threatsDetected / metrics.totalScans) * 100)}%`
                : '0%'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            High &amp; critical severity
          </p>
        </div>

        {/* Card 3 */}
        <div className="card p-5 space-y-2 border-emerald-500/25">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Safe Communications
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-emerald-400 font-mono">
              {metrics.safeIdentified}
            </span>
            <span className="text-[11px] text-emerald-400/80 font-mono">
              {metrics.totalScans > 0
                ? `${Math.round((metrics.safeIdentified / metrics.totalScans) * 100)}%`
                : '0%'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Benign notifications
          </p>
        </div>

        {/* Card 4 */}
        <div className="card p-5 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Average Risk Score
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white font-mono">
              {metrics.avgRiskScore}
              <span className="text-xs text-slate-500 font-normal"> / 100</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Mean</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Normalized across all scans
          </p>
        </div>
      </div>

      {/* Two Columns: Distribution & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Risk Distribution Card */}
        <div className="lg:col-span-6 card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              Risk Level Breakdown
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Totals</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-400 font-medium">Critical (85–100)</span>
                <span className="text-slate-300 font-mono">{metrics.riskLevelCounts.critical}</span>
              </div>
              <div className="w-full bg-[#06090F] rounded-full h-1.5 overflow-hidden border border-white/[0.04]">
                <div
                  className="bg-red-500 h-1.5 rounded-full transition-all"
                  style={{
                    width: `${metrics.totalScans ? (metrics.riskLevelCounts.critical / metrics.totalScans) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-orange-400 font-medium">High Risk (65–84)</span>
                <span className="text-slate-300 font-mono">{metrics.riskLevelCounts.high}</span>
              </div>
              <div className="w-full bg-[#06090F] rounded-full h-1.5 overflow-hidden border border-white/[0.04]">
                <div
                  className="bg-orange-500 h-1.5 rounded-full transition-all"
                  style={{
                    width: `${metrics.totalScans ? (metrics.riskLevelCounts.high / metrics.totalScans) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-400 font-medium">Medium (35–64)</span>
                <span className="text-slate-300 font-mono">{metrics.riskLevelCounts.medium}</span>
              </div>
              <div className="w-full bg-[#06090F] rounded-full h-1.5 overflow-hidden border border-white/[0.04]">
                <div
                  className="bg-amber-400 h-1.5 rounded-full transition-all"
                  style={{
                    width: `${metrics.totalScans ? (metrics.riskLevelCounts.medium / metrics.totalScans) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-400 font-medium">Safe / Low (0–34)</span>
                <span className="text-slate-300 font-mono">
                  {metrics.riskLevelCounts.safe + metrics.riskLevelCounts.low}
                </span>
              </div>
              <div className="w-full bg-[#06090F] rounded-full h-1.5 overflow-hidden border border-white/[0.04]">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full transition-all"
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

        {/* Threat Categories */}
        <div className="lg:col-span-6 card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-400" />
              Detected Threat Categories
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Count</span>
          </div>

          {Object.keys(metrics.categoryCounts).length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {Object.entries(metrics.categoryCounts).map(([cat, count]) => (
                <div
                  key={cat}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#06090F] border border-white/[0.06] text-xs"
                >
                  <span className="text-slate-300 font-medium truncate max-w-xs">{cat}</span>
                  <span className="font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white font-semibold border border-white/[0.08] text-[11px]">
                    {count} {count === 1 ? 'scan' : 'scans'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 space-y-1">
              <p>No threat categories recorded yet in this session.</p>
              <p className="text-[11px] text-slate-600">Scan messages to populate real category telemetry.</p>
            </div>
          )}
        </div>
      </div>

      {/* History Audit Trail */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            Audit Trail ({history.length})
          </h3>
          <span className="text-[11px] text-slate-500">Click any row to open incident report</span>
        </div>

        {history.length > 0 ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#070A12] border-b border-white/[0.08] text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Payload Snippet</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Severity</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {history.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedScan(item)}
                        className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                      >
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3 capitalize whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-semibold text-slate-400">
                            {item.input_type || 'message'}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-w-xs truncate font-mono text-[11px] text-slate-300">
                          {item.target_text}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-white font-medium text-[11px]">
                          {item.threat_category}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`badge ${
                              item.risk_level === 'CRITICAL'
                                ? 'risk-critical'
                                : item.risk_level === 'HIGH'
                                ? 'risk-high'
                                : item.risk_level === 'MEDIUM'
                                ? 'risk-medium'
                                : 'risk-safe'
                            }`}
                          >
                            {item.risk_level}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold font-mono text-white whitespace-nowrap">
                          {item.risk_score}/100
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 group-hover:underline">
                            <span>View</span>
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
          <div className="card p-10 text-center space-y-3">
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5 text-slate-500" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">No Session Records Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Run message, screenshot, or URL scans to generate live session telemetry.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              <Link href="/scanner" className="btn-primary text-xs">
                Scan a Message
              </Link>
              <button
                onClick={handlePopulateSampleSession}
                className="btn-secondary text-xs"
              >
                Load Sample Scans
              </button>
            </div>
          </div>
        )}
      </div>

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
