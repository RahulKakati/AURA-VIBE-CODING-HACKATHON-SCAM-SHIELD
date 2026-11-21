'use client';

import React from 'react';
import { SAMPLE_SCENARIOS } from '@/lib/samples';
import { SampleScenario } from '@/lib/types';
import { ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface SampleScenariosProps {
  onSelectSample: (sample: SampleScenario) => void;
}

export default function SampleScenarios({ onSelectSample }: SampleScenariosProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-blue-400" />
            Curated Threat Intelligence Scenarios
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any verified scenario below to load and test ScamShield AI&apos;s detection engine instantly.
          </p>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-400 self-start sm:self-auto">
          6 Active Threats · 2 Safe Baselines
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SAMPLE_SCENARIOS.map((sample) => {
          const isLegit = sample.risk_level === 'SAFE';

          return (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="card p-4 hover:border-white/[0.18] hover:bg-[#0E1424] transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1 text-[10px]">
                  <span
                    className={`badge ${
                      isLegit ? 'risk-safe' : 'risk-critical'
                    }`}
                  >
                    {isLegit ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Safe Sample
                      </span>
                    ) : (
                      'Threat Scenario'
                    )}
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">
                    {sample.language}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                  {sample.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {sample.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span className="text-[11px] font-semibold">Load into Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
