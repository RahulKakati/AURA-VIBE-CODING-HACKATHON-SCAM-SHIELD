'use client';

import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '@/lib/quizData';
import { QuizQuestion } from '@/lib/types';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
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
      if (score + (selectedOption === currentQuestion.correctIndex ? 1 : 0) >= 6) {
        confetti({
          particleCount: 80,
          spread: 60,
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

  if (quizFinished) {
    const finalScore = score;
    const total = QUIZ_QUESTIONS.length;
    const percentage = Math.round((finalScore / total) * 100);

    let rankTitle = 'Elite Cyber Defender';
    let rankDesc = 'Exceptional cyber hygiene! You consistently recognize psychological manipulation, smishing lures, and fake banking threats.';
    let rankBadge = 'risk-safe';

    if (finalScore < 5) {
      rankTitle = 'Vulnerability Alert';
      rankDesc = 'You are susceptible to prevalent UPI and KYC smishing tactics. Review the awareness guides below carefully.';
      rankBadge = 'risk-critical';
    } else if (finalScore < 7) {
      rankTitle = 'Vigilant Netizen';
      rankDesc = 'Good overall awareness. Watch out for subtle smishing indicators and token fee scams.';
      rankBadge = 'risk-medium';
    }

    return (
      <div className="card-elevated p-8 sm:p-12 text-center space-y-6 fade-up">
        <div className="w-14 h-14 rounded-xl bg-surface-2 border border-surface-border flex items-center justify-center mx-auto">
          <Award className="w-7 h-7 text-brand-blueLight" />
        </div>

        <div className="space-y-2">
          <span className={`badge ${rankBadge} uppercase`}>
            {rankTitle}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Quiz Completed
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            {rankDesc}
          </p>
        </div>

        <div className="inline-flex items-center gap-6 p-4 rounded-xl bg-surface-1 border border-surface-border">
          <div>
            <span className="block text-2xl font-black text-text-primary font-mono">
              {finalScore} / {total}
            </span>
            <span className="text-2xs text-text-muted uppercase font-medium">
              Correct Answers
            </span>
          </div>
          <div className="w-px h-8 bg-surface-border" />
          <div>
            <span className="block text-2xl font-black text-brand-blueLight font-mono">
              {percentage}%
            </span>
            <span className="text-2xs text-text-muted uppercase font-medium">
              Accuracy
            </span>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={handleRestart}
            className="btn-primary flex items-center gap-2 text-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 fade-up">
      {/* Quiz Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>
            Question <strong className="text-text-primary">{currentIndex + 1}</strong> of {QUIZ_QUESTIONS.length}
          </span>
          <span className="font-mono text-2xs text-brand-blueLight">
            {progressPercent}% Complete
          </span>
        </div>
        <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden border border-surface-border">
          <div
            className="bg-brand-blue h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="card-elevated p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded-md bg-surface-2 border border-surface-border text-brand-blueLight font-medium text-2xs">
            {currentQuestion.category}
          </span>
          <span className="text-text-muted font-mono text-2xs">
            Context: {currentQuestion.source}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-text-primary">
            {currentQuestion.title}
          </h3>
          <div className="p-3.5 rounded-lg bg-surface-1 border border-surface-border text-text-secondary text-xs sm:text-sm leading-relaxed">
            &ldquo;{currentQuestion.scenario}&rdquo;
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctIndex;

            let optionStyle = 'bg-surface-1 border-surface-border hover:border-surface-borderLight hover:bg-surface-2 text-text-secondary';

            if (isAnswered) {
              if (isCorrect) {
                optionStyle = 'bg-status-safeBg border-status-safeBorder text-status-safe font-medium';
              } else if (isSelected) {
                optionStyle = 'bg-status-criticalBg border-status-criticalBorder text-red-300 font-medium';
              } else {
                optionStyle = 'opacity-40 border-surface-border bg-surface-1 text-text-muted';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-2xs font-mono font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed flex-1">{option}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-status-safe shrink-0 mt-0.5" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback on answer */}
        {isAnswered && (
          <div className="pt-4 border-t border-surface-border space-y-4 fade-up">
            <div className="p-4 rounded-lg bg-surface-1 border border-surface-border space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-brand-blueLight" />
                Explanation
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {currentQuestion.explanation}
              </p>

              {currentQuestion.redFlags.length > 0 && (
                <div className="pt-2 space-y-1">
                  <span className="text-2xs font-bold text-status-medium uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Key Red Flags:
                  </span>
                  <ul className="list-disc list-inside text-2xs text-text-muted space-y-0.5">
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
                className="btn-primary flex items-center gap-1.5 text-xs"
              >
                <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'View Results' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
