import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, type Step1Data } from '../schemas/inquiry.schema';
import { SERVICE_OPTIONS } from '../services/constants';
import type { InquiryFormData } from '../types';

interface Step1Props {
  data: Partial<InquiryFormData>;
  onNext: (data: Step1Data) => void;
}

export function Step1Service({ data, onNext }: Step1Props) {
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      serviceType: data.serviceType || undefined,
    },
  });

  const selected = watch('serviceType');

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">What can we help you with?</h2>
        <p className="text-gray-400 text-sm font-medium">
          Select the primary service that best matches your project needs.
        </p>
      </div>

      {errors.serviceType && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2" role="alert">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.serviceType.message}
        </div>
      )}

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        role="radiogroup"
        aria-label="Service type selection"
      >
        {SERVICE_OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setValue('serviceType', option.value, { shouldValidate: true })}
              className={`service-card text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 ${
                isSelected ? 'service-card-selected' : 'service-card-unselected'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0" aria-hidden="true">{option.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                      {option.label}
                    </span>
                    {isSelected && (
                      <span className="ml-auto shrink-0 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{option.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          id="step1-next-btn"
          className="btn-primary"
        >
          Continue
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
