'use client';

import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '@/lib/quizData';
import { QuizQuestion } from '@/lib/types';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function CyberQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      // Trigger celebratory confetti if passed with high score
      if (score + (selectedOption === currentQuestion.correctIndex ? 1 : 0) >= 6) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Final Results Screen
  if (quizFinished) {
    const finalScore = score;
    const total = QUIZ_QUESTIONS.length;
    const percentage = Math.round((finalScore / total) * 100);

    let rankTitle = 'Elite Cyber Defender';
    let rankDesc = 'Exceptional cyber hygiene! You consistently identify advanced social engineering, smishing tricks, and fake banking alerts.';
    let rankColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';

    if (finalScore < 5) {
      rankTitle = 'Cyber Vulnerability Alert';
      rankDesc = 'You are susceptible to prevalent UPI and KYC smishing scams. Please review the awareness guides below carefully.';
      rankColor = 'text-red-400 border-red-500/30 bg-red-500/10';
    } else if (finalScore < 7) {
      rankTitle = 'Vigilant Netizen';
      rankDesc = 'Good awareness, but certain subtle smishing cues or token fee lures could still mislead you. Stay vigilant!';
      rankColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    }

    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-cyber-darker border border-cyber-border text-center space-y-6 cyber-glass">
        <div className="w-16 h-16 rounded-2xl bg-cyber-card border border-cyber-border flex items-center justify-center mx-auto shadow-lg shadow-cyber-cyan/10">
          <Award className="w-8 h-8 text-cyber-cyan" />
        </div>

        <div className="space-y-2">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${rankColor}`}>
            {rankTitle}
          </span>
          <h3 className="text-3xl font-black text-white">
            Quiz Completed!
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            {rankDesc}
          </p>
        </div>

        {/* Score Readout */}
        <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-cyber-darkest border border-cyber-border">
          <div>
            <span className="block text-3xl font-black text-white font-mono">
              {finalScore} / {total}
            </span>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Correct Answers
            </span>
          </div>
          <div className="w-px h-10 bg-cyber-border" />
          <div>
            <span className="block text-3xl font-black text-cyber-cyan font-mono">
              {percentage}%
            </span>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Accuracy Score
            </span>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-extrabold text-sm hover:opacity-95 transition-all shadow-lg shadow-cyber-cyan/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Awareness Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz Progress Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300">
            Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-cyber-cyan font-bold font-mono">
            {progressPercent}% Completed
          </span>
        </div>
        <div className="w-full bg-cyber-card rounded-full h-2 overflow-hidden border border-cyber-border/60">
          <div
            className="bg-gradient-to-r from-cyber-blue to-cyber-cyan h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-cyber-darker border border-cyber-border space-y-6 cyber-glass">
        {/* Source & Category */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-cyber-card border border-cyber-border text-cyber-cyan font-semibold">
            {currentQuestion.category}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            Context: {currentQuestion.source}
          </span>
        </div>

        {/* Question Title & Scenario */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {currentQuestion.title}
          </h3>
          <div className="p-4 rounded-xl bg-cyber-darkest border border-cyber-border/70 text-slate-200 text-sm leading-relaxed">
            &ldquo;{currentQuestion.scenario}&rdquo;
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctIndex;

            let optionStyle = 'bg-cyber-card/60 border-cyber-border hover:border-slate-500 hover:bg-cyber-card text-slate-200';

            if (isAnswered) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-sm shadow-emerald-500/20';
              } else if (isSelected) {
                optionStyle = 'bg-red-950/40 border-red-500 text-red-300 shadow-sm shadow-red-500/20';
              } else {
                optionStyle = 'opacity-40 border-cyber-border bg-cyber-card/30 text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 ${optionStyle}`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed flex-1">{option}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Explanation Box upon answering */}
        {isAnswered && (
          <div className="pt-4 border-t border-cyber-border space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
                Cybersecurity Expert Explanation
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>

              {currentQuestion.redFlags.length > 0 && (
                <div className="pt-2 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Key Red Flags to Remember:
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-0.5">
                    {currentQuestion.redFlags.map((flag, fIdx) => (
                      <li key={fIdx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darkest font-extrabold text-xs hover:opacity-95 transition-all shadow-md shadow-cyber-cyan/20"
              >
                <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'View Final Results' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
