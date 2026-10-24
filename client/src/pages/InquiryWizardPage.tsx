import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ProgressBar } from '../components/ProgressBar';
import { Step1Service } from '../components/Step1Service';
import { Step2Details } from '../components/Step2Details';
import { Step3Budget } from '../components/Step3Budget';
import { Step4Contact } from '../components/Step4Contact';
import { Step5Review } from '../components/Step5Review';
import { ConfirmationScreen } from '../components/ConfirmationScreen';
import { submitInquiry } from '../services/api';
import type { InquiryFormData, InquiryConfirmation } from '../types';
import type { Step1Data, Step2Data, Step3Data, Step4Data } from '../schemas/inquiry.schema';

const INITIAL_FORM_DATA: InquiryFormData = {
  serviceType: '',
  projectTitle: '',
  projectDescription: '',
  problemStatement: '',
  desiredOutcomes: '',
  technicalRequirements: '',
  existingSystemDetails: '',
  budgetRange: undefined,
  timeline: undefined,
  projectStage: undefined,
  name: '',
  email: '',
  companyName: '',
  consentGiven: false,
};

export function InquiryWizardPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<InquiryFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<InquiryConfirmation | null>(null);

  const handleStep1 = useCallback((data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStep2 = useCallback((data: Step2Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStep3 = useCallback((data: Step3Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStep4 = useCallback((data: Step4Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGoToStep = useCallback((step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        ...formData,
        serviceType: formData.serviceType as Exclude<typeof formData.serviceType, ''>,
      };

      const response = await submitInquiry(payload as Parameters<typeof submitInquiry>[0]);

      if (response.success && response.data) {
        setConfirmation(response.data);
      } else {
        setSubmitError(response.message || 'Submission failed. Please try again.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        if (data?.errors?.length) {
          setSubmitError(`Validation error: ${data.errors[0].message}`);
        } else {
          setSubmitError(data?.message || 'The server rejected the submission. Please check your details.');
        }
      } else if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting]);

  const handleStartNew = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setConfirmation(null);
    setSubmitError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-gray-950/90 backdrop-blur-lg">
        <div className="max-w-3xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" aria-label="Go back to home">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xs">
              C
            </div>
            <span className="font-bold text-white text-sm hidden sm:block">Cynbit Brief Builder</span>
          </Link>
          {!confirmation && (
            <div className="text-xs text-gray-600 font-medium">
              Step {currentStep} of 5
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {confirmation ? (
            <div className="mt-8">
              <ConfirmationScreen confirmation={confirmation} onStartNew={handleStartNew} />
            </div>
          ) : (
            <>
              <div className="mt-8 mb-8">
                <ProgressBar currentStep={currentStep} />
              </div>

              <div className="glass-card-dark p-6 sm:p-8 animate-slide-up">
                {currentStep === 1 && (
                  <Step1Service data={formData} onNext={handleStep1} />
                )}
                {currentStep === 2 && (
                  <Step2Details data={formData} onNext={handleStep2} onBack={handleBack} />
                )}
                {currentStep === 3 && (
                  <Step3Budget data={formData} onNext={handleStep3} onBack={handleBack} />
                )}
                {currentStep === 4 && (
                  <Step4Contact data={formData} onNext={handleStep4} onBack={handleBack} />
                )}
                {currentStep === 5 && (
                  <Step5Review
                    data={formData}
                    onSubmit={handleSubmit}
                    onBack={handleBack}
                    onGoToStep={handleGoToStep}
                    isSubmitting={isSubmitting}
                    error={submitError}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-3 px-4 text-center">
        <p className="text-xs text-gray-700 font-medium">
          Independent Assessment Prototype · Not an official Cynbit product ·{' '}
          <a
            href="https://www.cynbit.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500 transition-colors"
          >
            cynbit.in
          </a>
        </p>
      </footer>
    </div>
  );
}
