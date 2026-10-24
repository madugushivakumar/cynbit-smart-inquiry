import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, type Step2Data } from '../schemas/inquiry.schema';
import type { InquiryFormData } from '../types';
import { FormField, TextInput, TextArea } from './FormField';

interface Step2Props {
  data: Partial<InquiryFormData>;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export function Step2Details({ data, onNext, onBack }: Step2Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      projectTitle: data.projectTitle || '',
      projectDescription: data.projectDescription || '',
      problemStatement: data.problemStatement || '',
      desiredOutcomes: data.desiredOutcomes || '',
      technicalRequirements: data.technicalRequirements || '',
      existingSystemDetails: data.existingSystemDetails || '',
    },
  });

  const watchedValues = watch();

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Tell us about your project</h2>
        <p className="text-gray-400 text-sm font-medium">
          The more detail you provide, the better we can prepare for our first conversation.
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          id="projectTitle"
          label="Project Title"
          required
          error={errors.projectTitle?.message}
          hint="A short, descriptive name for your project"
        >
          <TextInput
            id="projectTitle"
            {...register('projectTitle')}
            placeholder="e.g. Customer Support Automation System"
            error={!!errors.projectTitle}
            aria-describedby={errors.projectTitle ? 'projectTitle-error' : undefined}
          />
        </FormField>

        <FormField
          id="projectDescription"
          label="Project Description"
          required
          error={errors.projectDescription?.message}
          hint="Describe what you're building and why it matters"
          currentLength={watchedValues.projectDescription?.length || 0}
          maxLength={2000}
        >
          <TextArea
            id="projectDescription"
            {...register('projectDescription')}
            rows={4}
            placeholder="Describe your project in detail. What are you building? Who will use it? What does success look like?"
            error={!!errors.projectDescription}
            aria-describedby={errors.projectDescription ? 'projectDescription-error' : undefined}
          />
        </FormField>

        <FormField
          id="problemStatement"
          label="Problem to Solve"
          required
          error={errors.problemStatement?.message}
          hint="What specific challenge or pain point are you addressing?"
          currentLength={watchedValues.problemStatement?.length || 0}
          maxLength={1000}
        >
          <TextArea
            id="problemStatement"
            {...register('problemStatement')}
            rows={3}
            placeholder="What problem does this project solve? What's the current situation without this solution?"
            error={!!errors.problemStatement}
            aria-describedby={errors.problemStatement ? 'problemStatement-error' : undefined}
          />
        </FormField>

        <FormField
          id="desiredOutcomes"
          label="Desired Outcomes"
          required
          error={errors.desiredOutcomes?.message}
          hint="What does success look like for this project?"
          currentLength={watchedValues.desiredOutcomes?.length || 0}
          maxLength={1000}
        >
          <TextArea
            id="desiredOutcomes"
            {...register('desiredOutcomes')}
            rows={3}
            placeholder="List the key outcomes you want to achieve. E.g. reduce manual work by 70%, launch in 3 months, handle 10k daily users..."
            error={!!errors.desiredOutcomes}
            aria-describedby={errors.desiredOutcomes ? 'desiredOutcomes-error' : undefined}
          />
        </FormField>

        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            id="technicalRequirements"
            label="Technical Requirements (Optional)"
            error={errors.technicalRequirements?.message}
            hint="Preferred tech stack, platforms, languages"
            currentLength={watchedValues.technicalRequirements?.length || 0}
            maxLength={800}
          >
            <TextArea
              id="technicalRequirements"
              {...register('technicalRequirements')}
              rows={3}
              placeholder="e.g. React frontend, Node.js API, AWS deployment, must integrate with Salesforce..."
              error={!!errors.technicalRequirements}
            />
          </FormField>

          <FormField
            id="existingSystemDetails"
            label="Existing System / Integrations (Optional)"
            error={errors.existingSystemDetails?.message}
            hint="Any systems this must connect to or replace"
            currentLength={watchedValues.existingSystemDetails?.length || 0}
            maxLength={800}
          >
            <TextArea
              id="existingSystemDetails"
              {...register('existingSystemDetails')}
              rows={3}
              placeholder="e.g. We currently use Zoho CRM, need to migrate from legacy PHP system, integrate with payment gateway..."
              error={!!errors.existingSystemDetails}
            />
          </FormField>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="btn-ghost" id="step2-back-btn">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back
        </button>
        <button type="submit" className="btn-primary" id="step2-next-btn">
          Continue
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
