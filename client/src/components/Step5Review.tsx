import type { InquiryFormData } from '../types';
import {
  SERVICE_LABELS,
  BUDGET_LABELS,
  TIMELINE_LABELS,
  PROJECT_STAGE_LABELS,
} from '../services/constants';

interface Step5ReviewProps {
  data: InquiryFormData;
  onSubmit: () => void;
  onBack: () => void;
  onGoToStep: (step: number) => void;
  isSubmitting: boolean;
  error: string | null;
}

function ReviewSection({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: number;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors hover:underline underline-offset-2"
          id={`edit-step${step}-btn`}
          aria-label={`Edit ${title}`}
        >
          Edit
        </button>
      </div>
      <div className="divide-y divide-gray-800/60">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="review-row">
      <span className="review-label">{label}</span>
      <span className="review-value">{value || <span className="text-gray-600 italic">Not provided</span>}</span>
    </div>
  );
}

export function Step5Review({
  data,
  onSubmit,
  onBack,
  onGoToStep,
  isSubmitting,
  error,
}: Step5ReviewProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Review your project brief</h2>
        <p className="text-gray-400 text-sm font-medium">
          Please review all your information before submitting. You can edit any section.
        </p>
      </div>

      {error && (
        <div
          className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm"
          role="alert"
        >
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-red-400 mb-1">Submission failed</p>
              <p className="text-red-300/80">{error}</p>
              <p className="text-red-300/60 text-xs mt-1">Your information has been preserved. Please try again.</p>
            </div>
          </div>
        </div>
      )}

      <ReviewSection title="Service Selected" step={1} onEdit={() => onGoToStep(1)}>
        <ReviewRow label="Service Type" value={SERVICE_LABELS[data.serviceType] || data.serviceType} />
      </ReviewSection>

      <ReviewSection title="Project Details" step={2} onEdit={() => onGoToStep(2)}>
        <ReviewRow label="Project Title" value={data.projectTitle} />
        <ReviewRow label="Description" value={data.projectDescription} />
        <ReviewRow label="Problem to Solve" value={data.problemStatement} />
        <ReviewRow label="Desired Outcomes" value={data.desiredOutcomes} />
        {data.technicalRequirements && (
          <ReviewRow label="Technical Requirements" value={data.technicalRequirements} />
        )}
        {data.existingSystemDetails && (
          <ReviewRow label="Existing Systems" value={data.existingSystemDetails} />
        )}
      </ReviewSection>

      <ReviewSection title="Budget & Timeline" step={3} onEdit={() => onGoToStep(3)}>
        <ReviewRow
          label="Budget Range"
          value={data.budgetRange ? BUDGET_LABELS[data.budgetRange] : undefined}
        />
        <ReviewRow
          label="Timeline"
          value={data.timeline ? TIMELINE_LABELS[data.timeline] : undefined}
        />
        <ReviewRow
          label="Project Stage"
          value={data.projectStage ? PROJECT_STAGE_LABELS[data.projectStage] : undefined}
        />
      </ReviewSection>

      <ReviewSection title="Contact Information" step={4} onEdit={() => onGoToStep(4)}>
        <ReviewRow label="Full Name" value={data.name} />
        <ReviewRow label="Email" value={data.email} />
        {data.companyName && <ReviewRow label="Company" value={data.companyName} />}
        <ReviewRow label="Consent" value={data.consentGiven ? 'Given ✓' : 'Not given'} />
      </ReviewSection>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="btn-ghost disabled:opacity-40"
          id="step5-back-btn"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="btn-primary min-w-[160px] justify-center"
          id="submit-inquiry-btn"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting…
            </>
          ) : (
            <>
              Submit Inquiry
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
