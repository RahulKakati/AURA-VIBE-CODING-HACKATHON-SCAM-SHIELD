'use client';

import React from 'react';
import { SAMPLE_SCENARIOS } from '@/lib/samples';
import { SampleScenario } from '@/lib/types';
import { ShieldAlert, ShieldCheck, ArrowRight, PlayCircle } from 'lucide-react';

interface SampleScenariosProps {
  onSelectSample: (sample: SampleScenario) => void;
}

export default function SampleScenarios({ onSelectSample }: SampleScenariosProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PlayCircle className="w-4 h-4 text-cyber-cyan" />
            Interactive Demonstration Scenarios
          </h3>
          <p className="text-xs text-slate-400">
            Click any realistic scenario below to immediately load and test ScamShield AI&apos;s detection engine.
          </p>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-1 rounded bg-cyber-card border border-cyber-border self-start sm:self-auto">
          6 Scams + 2 Safe Baselines
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {SAMPLE_SCENARIOS.map((sample) => {
          const isLegit = sample.risk_level === 'SAFE';

          return (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="group relative p-4 rounded-xl bg-cyber-darker border border-cyber-border hover:border-cyber-cyan/50 hover:bg-cyber-card/70 transition-all cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1 text-[10px]">
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full border ${
                      isLegit
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}
                  >
                    {isLegit ? 'Safe Scenario' : 'Threat Scenario'}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {sample.language}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white group-hover:text-cyber-cyan transition-colors line-clamp-1">
                  {sample.title}
                </h4>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {sample.description}
                </p>
              </div>

              <div className="pt-2 border-t border-cyber-border/60 flex items-center justify-between text-xs font-medium text-cyber-cyan group-hover:translate-x-0.5 transition-transform">
                <span className="text-[11px]">Load & Scan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
