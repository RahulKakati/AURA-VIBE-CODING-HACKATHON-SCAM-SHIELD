'use client';

import React from 'react';
import { RiskLevel } from '@/lib/types';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
  confidence?: number;
}

export default function RiskGauge({ score, level, confidence }: RiskGaugeProps) {
  const radius = 56;
  const stroke = 7;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const safeScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  const getConfig = (lvl: RiskLevel) => {
    switch (lvl) {
      case 'CRITICAL':
        return { color: '#EF4444', label: 'Critical Threat', className: 'risk-critical', Icon: ShieldAlert };
      case 'HIGH':
        return { color: '#F97316', label: 'High Risk', className: 'risk-high', Icon: ShieldAlert };
      case 'MEDIUM':
        return { color: '#F59E0B', label: 'Medium Risk', className: 'risk-medium', Icon: AlertTriangle };
      case 'LOW':
        return { color: '#0EA5E9', label: 'Low Risk', className: 'risk-low', Icon: ShieldCheck };
      default:
        return { color: '#22C55E', label: 'Safe Content', className: 'risk-safe', Icon: ShieldCheck };
    }
  };

  const { color, label, className, Icon } = getConfig(level);

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
          <circle
            stroke="rgba(255, 255, 255, 0.08)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-white font-mono tracking-tight">{safeScore}</span>
          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">/100</span>
        </div>
      </div>

      <div className={`badge ${className} text-[11px]`}>
        <Icon className="w-3 h-3" />
        <span>{label}</span>
      </div>

      {confidence !== undefined && (
        <span className="text-[10px] text-slate-500 font-mono">
          Confidence: <strong className="text-slate-300 font-semibold">{confidence}%</strong>
        </span>
      )}
    </div>
  );
}
