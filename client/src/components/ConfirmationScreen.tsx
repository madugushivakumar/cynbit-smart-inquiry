import type { InquiryConfirmation } from '../types';
import { SERVICE_LABELS } from '../services/constants';

interface ConfirmationScreenProps {
  confirmation: InquiryConfirmation;
  onStartNew: () => void;
}

export function ConfirmationScreen({ confirmation, onStartNew }: ConfirmationScreenProps) {
  return (
    <div className="text-center max-w-lg mx-auto animate-fade-in py-8">
      {/* Success icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping opacity-20" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Brief Submitted!</h2>
      <p className="text-gray-400 text-sm font-medium mb-8">
        Your project brief has been received. The Cynbit team will review it and reach out within 24 hours.
      </p>

      {/* Reference card */}
      <div className="glass-card-dark p-6 mb-6 text-center">
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">
          Your Reference Number
        </div>
        <div
          className="text-2xl font-mono font-bold gradient-text-primary tracking-wider mb-1"
          id="reference-code"
          aria-label={`Reference number: ${confirmation.referenceCode}`}
        >
          {confirmation.referenceCode}
        </div>
        <p className="text-xs text-gray-600 mt-3 font-medium">
          Save this reference number. You may need it if you contact us about this inquiry.
        </p>
      </div>

      {/* Summary */}
      <div className="glass-card p-4 mb-8 text-left space-y-2.5">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Service</span>
          <span className="text-sm text-gray-200 font-medium">
            {SERVICE_LABELS[confirmation.serviceType] || confirmation.serviceType}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Project</span>
          <span className="text-sm text-gray-200 font-medium">{confirmation.projectTitle}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Status</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            {confirmation.status}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Submitted</span>
          <span className="text-sm text-gray-400 font-medium">
            {new Date(confirmation.createdAt).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onStartNew}
          className="btn-primary justify-center"
          id="start-new-inquiry-btn"
        >
          Start Another Inquiry
        </button>
        <a
          href="https://www.cynbit.in"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary justify-center"
          id="return-to-cynbit-btn"
        >
          Return to Cynbit
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
