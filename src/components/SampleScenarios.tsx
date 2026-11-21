'use client';

import React from 'react';
import { SAMPLE_SCENARIOS } from '@/lib/samples';
import { SampleScenario } from '@/lib/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SampleScenariosProps {
  onSelectSample: (sample: SampleScenario) => void;
}

export default function SampleScenarios({ onSelectSample }: SampleScenariosProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-blueLight" />
            Curated Test Scenarios
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Click any realistic scenario below to load and test ScamShield AI&apos;s detection engine instantly.
          </p>
        </div>
        <span className="text-2xs font-semibold px-2 py-0.5 rounded bg-surface-2 border border-surface-border text-text-muted self-start sm:self-auto">
          6 Threats + 2 Legitimate Baselines
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SAMPLE_SCENARIOS.map((sample) => {
          const isLegit = sample.risk_level === 'SAFE';

          return (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="card p-4 hover:border-surface-borderLight hover:bg-surface-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1 text-2xs">
                  <span
                    className={`badge ${
                      isLegit ? 'risk-safe' : 'risk-critical'
                    }`}
                  >
                    {isLegit ? 'Safe Sample' : 'Threat Scenario'}
                  </span>
                  <span className="text-text-muted font-mono">
                    {sample.language}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-text-primary group-hover:text-brand-blueLight transition-colors line-clamp-1">
                  {sample.title}
                </h4>

                <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                  {sample.description}
                </p>
              </div>

              <div className="pt-2 border-t border-surface-border flex items-center justify-between text-xs font-medium text-brand-blueLight group-hover:translate-x-0.5 transition-transform">
                <span className="text-2xs font-semibold">Load into Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
