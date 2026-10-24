import React from 'react';
import { STEPS } from '../services/constants';

interface ProgressBarProps {
  currentStep: number;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      {/* Mobile progress */}
      <div className="flex items-center justify-between mb-2 sm:hidden">
        <span className="text-xs text-gray-400 font-medium">
          Step {currentStep} of {STEPS.length}
        </span>
        <span className="text-xs text-indigo-400 font-semibold">{STEPS[currentStep - 1]?.title}</span>
      </div>
      <div className="w-full bg-gray-800/50 rounded-full h-1.5 sm:hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Desktop progress steps */}
      <div className="hidden sm:flex items-center">
        {STEPS.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`step-indicator ${
                    isActive
                      ? 'step-active'
                      : isCompleted
                      ? 'step-completed'
                      : 'step-pending'
                  }`}
                  aria-label={`Step ${step.number}: ${step.title}${isCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap ${
                    isActive ? 'text-indigo-400' : isCompleted ? 'text-emerald-400' : 'text-gray-600'
                  }`}
                >
                  {step.short}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${
                    isCompleted ? 'bg-emerald-600' : 'bg-gray-800'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
