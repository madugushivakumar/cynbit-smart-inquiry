import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema, type Step3Data } from '../schemas/inquiry.schema';
import type { InquiryFormData } from '../types';
import { BUDGET_OPTIONS, TIMELINE_OPTIONS, PROJECT_STAGE_OPTIONS } from '../services/constants';

interface Step3Props {
  data: Partial<InquiryFormData>;
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

function SelectionGroup<T extends string>({
  label,
  options,
  selected,
  onSelect,
  columns = 2,
}: {
  label: string;
  options: Array<{ value: T; label: string; description?: string }>;
  selected?: T;
  onSelect: (value: T | undefined) => void;
  columns?: number;
}) {
  return (
    <div>
      <h3 className="label-text mb-3">{label}</h3>
      <div className={`grid grid-cols-1 ${columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-2`}
        role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(isSelected ? undefined : option.value)}
              className={`text-left p-3.5 rounded-xl border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-950 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/10 text-white'
                  : 'border-gray-700/60 bg-gray-900/40 text-gray-300 hover:border-gray-600 hover:bg-gray-800/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                  )}
                </div>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Step3Budget({ data, onNext, onBack }: Step3Props) {
  const { handleSubmit, watch, setValue } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      projectStage: data.projectStage,
    },
  });

  const values = watch();

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Budget & Timeline</h2>
        <p className="text-gray-400 text-sm font-medium">
          All fields on this step are optional. Sharing this helps us tailor our proposal to your constraints.
        </p>
      </div>

      <div className="space-y-8">
        <SelectionGroup
          label="Approximate Budget (Optional)"
          options={BUDGET_OPTIONS}
          selected={values.budgetRange}
          onSelect={(v) => setValue('budgetRange', v)}
          columns={3}
        />

        <SelectionGroup
          label="Preferred Timeline (Optional)"
          options={TIMELINE_OPTIONS}
          selected={values.timeline}
          onSelect={(v) => setValue('timeline', v)}
        />

        <SelectionGroup
          label="Current Project Stage (Optional)"
          options={PROJECT_STAGE_OPTIONS}
          selected={values.projectStage}
          onSelect={(v) => setValue('projectStage', v)}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="btn-ghost" id="step3-back-btn">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back
        </button>
        <button type="submit" className="btn-primary" id="step3-next-btn">
          Continue
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
