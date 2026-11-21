'use client';

import React from 'react';
import { RiskLevel } from '@/lib/types';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
  confidence?: number;
}

export default function RiskGauge({ score, level, confidence = 85 }: RiskGaugeProps) {
  // SVG circular gauge math
  const radius = 64;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Score percentage (clamp 0 - 100)
  const safeScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  const getColorConfig = (lvl: RiskLevel) => {
    switch (lvl) {
      case 'CRITICAL':
        return {
          stroke: '#EF4444',
          glow: 'rgba(239, 68, 68, 0.4)',
          badgeBg: 'bg-red-500/15',
          badgeText: 'text-red-400',
          badgeBorder: 'border-red-500/30',
          label: 'CRITICAL THREAT',
          Icon: ShieldAlert,
        };
      case 'HIGH':
        return {
          stroke: '#F97316',
          glow: 'rgba(249, 115, 22, 0.4)',
          badgeBg: 'bg-orange-500/15',
          badgeText: 'text-orange-400',
          badgeBorder: 'border-orange-500/30',
          label: 'HIGH RISK',
          Icon: ShieldAlert,
        };
      case 'MEDIUM':
        return {
          stroke: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.35)',
          badgeBg: 'bg-amber-500/15',
          badgeText: 'text-amber-400',
          badgeBorder: 'border-amber-500/30',
          label: 'SUSPICIOUS / MEDIUM',
          Icon: AlertTriangle,
        };
      case 'LOW':
        return {
          stroke: '#38BDF8',
          glow: 'rgba(56, 189, 248, 0.3)',
          badgeBg: 'bg-sky-500/15',
          badgeText: 'text-sky-300',
          badgeBorder: 'border-sky-500/30',
          label: 'LOW RISK',
          Icon: ShieldCheck,
        };
      case 'SAFE':
      default:
        return {
          stroke: '#10B981',
          glow: 'rgba(16, 185, 129, 0.4)',
          badgeBg: 'bg-emerald-500/15',
          badgeText: 'text-emerald-400',
          badgeBorder: 'border-emerald-500/30',
          label: 'SAFE CONTENT',
          Icon: ShieldCheck,
        };
    }
  };

  const config = getColorConfig(level);
  const Icon = config.Icon;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
          {/* Background track */}
          <circle
            stroke="#1E2C4B"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Animated score ring */}
          <circle
            stroke={config.stroke}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 1s ease-in-out',
              filter: `drop-shadow(0 0 8px ${config.glow})`,
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-white tracking-tight">
            {safeScore}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Risk Score
          </span>
        </div>
      </div>

      {/* Risk Level Badge */}
      <div
        className={`mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase ${config.badgeBg} ${config.badgeText} ${config.badgeBorder}`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span>{config.label}</span>
      </div>

      {confidence !== undefined && (
        <span className="mt-1 text-[11px] text-slate-400">
          Confidence: <strong className="text-slate-300 font-medium">{confidence}%</strong>
        </span>
      )}
    </div>
  );
}
