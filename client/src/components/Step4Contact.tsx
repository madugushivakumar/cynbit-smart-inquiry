import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step4Schema, type Step4Data } from '../schemas/inquiry.schema';
import type { InquiryFormData } from '../types';
import { FormField, TextInput } from './FormField';

interface Step4Props {
  data: Partial<InquiryFormData>;
  onNext: (data: Step4Data) => void;
  onBack: () => void;
}

export function Step4Contact({ data, onNext, onBack }: Step4Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      name: data.name || '',
      email: data.email || '',
      companyName: data.companyName || '',
      consentGiven: data.consentGiven || false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Your contact information</h2>
        <p className="text-gray-400 text-sm font-medium">
          We'll use this to send you a copy of your brief and to schedule your discovery call.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField
            id="name"
            label="Full Name"
            required
            error={errors.name?.message}
          >
            <TextInput
              id="name"
              {...register('name')}
              type="text"
              placeholder="e.g. Priya Sharma"
              autoComplete="name"
              error={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
          </FormField>

          <FormField
            id="email"
            label="Business Email"
            required
            error={errors.email?.message}
          >
            <TextInput
              id="email"
              {...register('email')}
              type="email"
              placeholder="priya@yourcompany.com"
              autoComplete="email"
              error={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </FormField>
        </div>

        <FormField
          id="companyName"
          label="Company / Organization (Optional)"
          error={errors.companyName?.message}
        >
          <TextInput
            id="companyName"
            {...register('companyName')}
            type="text"
            placeholder="Your company name"
            autoComplete="organization"
            error={!!errors.companyName}
          />
        </FormField>

        {/* Consent checkbox */}
        <div className="mt-6 p-5 bg-gray-900/60 border border-gray-700/40 rounded-xl">
          <label className="flex items-start gap-3 cursor-pointer group" htmlFor="consentGiven">
            <div className="relative mt-0.5">
              <input
                {...register('consentGiven')}
                id="consentGiven"
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded border-2 border-gray-600 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 transition-all duration-150 flex items-center justify-center group-hover:border-indigo-400">
                <svg
                  className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-300 font-medium leading-relaxed">
                I consent to Cynbit Technologies using the information I provide in this brief to contact me
                and prepare a tailored response to my project inquiry.{' '}
                <span className="text-gray-500 text-xs">
                  This information will not be shared with third parties or used for unsolicited marketing.
                </span>
              </span>
            </div>
          </label>
          {errors.consentGiven && (
            <p className="mt-2 text-xs text-red-400 font-medium flex items-center gap-1 ml-8" role="alert">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.consentGiven.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="btn-ghost" id="step4-back-btn">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back
        </button>
        <button type="submit" className="btn-primary" id="step4-next-btn">
          Review Submission
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
