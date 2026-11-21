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
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-surface-border">
        <div className="space-y-1">
          <p className="text-2xs font-semibold text-brand-accent uppercase tracking-widest">
            Session Analytics
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Security Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Live local telemetry, threat category distribution, and scan audit log.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {history.length > 0 && (
            <>
              <button
                onClick={handleExportJson}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-2 border border-surface-border hover:border-surface-borderLight text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={handleClearHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-2 border border-surface-border hover:border-red-500/30 text-xs text-text-muted hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </>
          )}

          <Link
            href="/scanner"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-brand-blue hover:bg-brand-blueSubtle text-white text-xs font-semibold transition-colors shadow-brand"
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
          <span className="text-2xs font-semibold text-text-muted uppercase tracking-wider">
            Total Scans
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-text-primary font-mono">
              {metrics.totalScans}
            </span>
            <span className="text-2xs text-text-muted">In this session</span>
          </div>
          <p className="text-2xs text-text-subtle">
            Stored locally in browser state
          </p>
        </div>

        {/* Card 2 */}
        <div className="card p-5 space-y-2 border-status-criticalBorder/30">
          <span className="text-2xs font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            Threats Caught
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-red-400 font-mono">
              {metrics.threatsDetected}
            </span>
            <span className="text-2xs text-text-muted font-mono">
              {metrics.totalScans > 0
                ? `${Math.round((metrics.threatsDetected / metrics.totalScans) * 100)}%`
                : '0%'}
            </span>
          </div>
          <p className="text-2xs text-text-subtle">
            High &amp; critical severity
          </p>
        </div>

        {/* Card 3 */}
        <div className="card p-5 space-y-2 border-status-safeBorder/30">
          <span className="text-2xs font-semibold text-status-safe uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Safe Communications
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-status-safe font-mono">
              {metrics.safeIdentified}
            </span>
            <span className="text-2xs text-text-muted font-mono">
              {metrics.totalScans > 0
                ? `${Math.round((metrics.safeIdentified / metrics.totalScans) * 100)}%`
                : '0%'}
            </span>
          </div>
          <p className="text-2xs text-text-subtle">
            Benign notifications
          </p>
        </div>

        {/* Card 4 */}
        <div className="card p-5 space-y-2">
          <span className="text-2xs font-semibold text-text-muted uppercase tracking-wider">
            Average Risk Score
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-text-primary font-mono">
              {metrics.avgRiskScore}
              <span className="text-xs text-text-muted font-normal"> / 100</span>
            </span>
            <span className="text-2xs text-text-muted">Aggregated</span>
          </div>
          <p className="text-2xs text-text-subtle">
            Calculated across session
          </p>
        </div>
      </div>

      {/* Two Columns: Distribution & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Risk Distribution Card */}
        <div className="lg:col-span-6 card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-brand-blueLight" />
              Risk Level Distribution
            </h3>
            <span className="text-2xs text-text-muted font-mono">Breakdown</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-400 font-medium">Critical (85–100)</span>
                <span className="text-text-secondary font-mono">{metrics.riskLevelCounts.critical}</span>
              </div>
              <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-status-critical h-1.5 rounded-full transition-all"
                  style={{
                    width: `${metrics.totalScans ? (metrics.riskLevelCounts.critical / metrics.totalScans) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-status-high font-medium">High Risk (65–84)</span>
                <span className="text-text-secondary font-mono">{metrics.riskLevelCounts.high}</span>
              </div>
              <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-status-high h-1.5 rounded-full transition-all"
                  style={{
                    width: `${metrics.totalScans ? (metrics.riskLevelCounts.high / metrics.totalScans) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-status-medium font-medium">Medium (35–64)</span>
                <span className="text-text-secondary font-mono">{metrics.riskLevelCounts.medium}</span>
              </div>
              <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-status-medium h-1.5 rounded-full transition-all"
                  style={{
                    width: `${metrics.totalScans ? (metrics.riskLevelCounts.medium / metrics.totalScans) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-status-safe font-medium">Safe / Low (0–34)</span>
                <span className="text-text-secondary font-mono">
                  {metrics.riskLevelCounts.safe + metrics.riskLevelCounts.low}
                </span>
              </div>
              <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-status-safe h-1.5 rounded-full transition-all"
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
            <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-brand-blueLight" />
              Detected Threat Categories
            </h3>
            <span className="text-2xs text-text-muted font-mono">Tallies</span>
          </div>

          {Object.keys(metrics.categoryCounts).length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {Object.entries(metrics.categoryCounts).map(([cat, count]) => (
                <div
                  key={cat}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-surface-1 border border-surface-border text-xs"
                >
                  <span className="text-text-secondary font-medium truncate max-w-xs">{cat}</span>
                  <span className="font-mono px-2 py-0.5 rounded bg-surface-2 text-text-primary font-semibold border border-surface-border text-2xs">
                    {count} {count === 1 ? 'scan' : 'scans'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-text-muted space-y-1">
              <p>No threat categories recorded yet in this session.</p>
              <p className="text-2xs text-text-subtle">Scan messages to populate real category telemetry.</p>
            </div>
          )}
        </div>
      </div>

      {/* History Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-blueLight" />
            Audit Trail ({history.length})
          </h3>
          <span className="text-2xs text-text-muted">Click any row to view full incident report</span>
        </div>

        {history.length > 0 ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-text-secondary">
                <thead className="bg-surface-2 border-b border-surface-border text-text-muted font-semibold uppercase tracking-wider text-2xs">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Content Snippet</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Risk</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {history.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedScan(item)}
                        className="hover:bg-surface-2 transition-colors cursor-pointer group"
                      >
                        <td className="px-4 py-3 font-mono text-2xs text-text-muted whitespace-nowrap">
                          {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3 capitalize whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-surface-2 border border-surface-border text-2xs font-medium text-text-muted">
                            {item.input_type || 'message'}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-w-xs truncate font-mono text-2xs text-text-secondary">
                          {item.target_text}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-text-primary font-medium text-2xs">
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
                        <td className="px-4 py-3 font-bold font-mono text-text-primary whitespace-nowrap">
                          {item.risk_score}/100
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-2xs font-semibold text-brand-blueLight group-hover:underline">
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
            <div className="w-10 h-10 rounded-lg bg-surface-2 border border-surface-border flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5 text-text-muted" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-text-primary">No Scans Recorded in This Session</h4>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                Scan messages, screenshots, or URLs to view live telemetry and risk distribution.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              <Link
                href="/scanner"
                className="btn-primary text-xs"
              >
                Scan a Message
              </Link>
              <button
                onClick={handlePopulateSampleSession}
                className="btn-secondary text-xs"
              >
                Load Sample Test Scans
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
