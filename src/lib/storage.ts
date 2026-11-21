import { ScanHistoryItem, ScanResult, ScanInputType } from './types';

const STORAGE_KEY = 'scamshield_scan_history_v1';

export function getScanHistory(): ScanHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load scan history from localStorage:', e);
    return [];
  }
}

export function saveScanToHistory(result: ScanResult, inputType: ScanInputType = 'message'): ScanHistoryItem {
  if (typeof window === 'undefined') {
    return {
      ...result,
      id: `scan-${Date.now()}`,
      input_type: inputType,
    };
  }

  try {
    const existing = getScanHistory();
    const newItem: ScanHistoryItem = {
      ...result,
      id: `scan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      input_type: inputType,
    };

    // Keep up to 50 latest scans in local session storage
    const updated = [newItem, ...existing].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newItem;
  } catch (e) {
    console.error('Failed to save scan to localStorage:', e);
    return {
      ...result,
      id: `scan-${Date.now()}`,
      input_type: inputType,
    };
  }
}

export function clearScanHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear scan history:', e);
  }
}

export interface DashboardMetrics {
  totalScans: number;
  threatsDetected: number; // HIGH + CRITICAL
  safeIdentified: number;  // SAFE + LOW
  mediumRisk: number;
  avgRiskScore: number;
  categoryCounts: Record<string, number>;
  riskLevelCounts: {
    safe: number;
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export function computeDashboardMetrics(history: ScanHistoryItem[]): DashboardMetrics {
  if (history.length === 0) {
    return {
      totalScans: 0,
      threatsDetected: 0,
      safeIdentified: 0,
      mediumRisk: 0,
      avgRiskScore: 0,
      categoryCounts: {},
      riskLevelCounts: { safe: 0, low: 0, medium: 0, high: 0, critical: 0 },
    };
  }

  let totalScore = 0;
  let threats = 0;
  let safeCount = 0;
  let mediumCount = 0;
  const categoryCounts: Record<string, number> = {};
  const riskLevelCounts = { safe: 0, low: 0, medium: 0, high: 0, critical: 0 };

  for (const item of history) {
    totalScore += item.risk_score;

    // Categorize risk
    if (item.risk_level === 'CRITICAL') {
      threats++;
      riskLevelCounts.critical++;
    } else if (item.risk_level === 'HIGH') {
      threats++;
      riskLevelCounts.high++;
    } else if (item.risk_level === 'MEDIUM') {
      mediumCount++;
      riskLevelCounts.medium++;
    } else if (item.risk_level === 'LOW') {
      safeCount++;
      riskLevelCounts.low++;
    } else {
      safeCount++;
      riskLevelCounts.safe++;
    }

    // Category tallies
    const cat = item.threat_category || 'Other';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  }

  return {
    totalScans: history.length,
    threatsDetected: threats,
    safeIdentified: safeCount,
    mediumRisk: mediumCount,
    avgRiskScore: Math.round(totalScore / history.length),
    categoryCounts,
    riskLevelCounts,
  };
}
