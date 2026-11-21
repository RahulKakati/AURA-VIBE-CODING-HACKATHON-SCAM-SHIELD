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
  const radius = 54;
  const stroke = 7;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const safeScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  const getConfig = (lvl: RiskLevel) => {
    switch (lvl) {
      case 'CRITICAL': return { color: '#EF4444', label: 'Critical', className: 'risk-critical', Icon: ShieldAlert };
      case 'HIGH':     return { color: '#F97316', label: 'High Risk', className: 'risk-high', Icon: ShieldAlert };
      case 'MEDIUM':   return { color: '#F59E0B', label: 'Medium Risk', className: 'risk-medium', Icon: AlertTriangle };
      case 'LOW':      return { color: '#38BDF8', label: 'Low Risk', className: 'risk-low', Icon: ShieldCheck };
      default:         return { color: '#22C55E', label: 'Safe', className: 'risk-safe', Icon: ShieldCheck };
    }
  };

  const { color, label, className, Icon } = getConfig(level);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
          <circle stroke="#1A263E" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.9s ease-in-out' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-text-primary font-mono">{safeScore}</span>
          <span className="text-2xs text-text-muted uppercase tracking-wider font-medium">/100</span>
        </div>
      </div>

      <div className={`badge ${className}`}>
        <Icon className="w-3 h-3" />
        {label}
      </div>

      {confidence !== undefined && (
        <span className="text-2xs text-text-muted">Confidence: <strong className="text-text-secondary">{confidence}%</strong></span>
      )}
    </div>
  );
}
