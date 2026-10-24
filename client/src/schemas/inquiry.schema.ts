import { z } from 'zod';

export const step1Schema = z.object({
  serviceType: z.enum(
    ['AI_AUTOMATION', 'WEB_APPLICATION', 'MOBILE_APPLICATION', 'BACKEND_CLOUD', 'DIGITAL_MARKETING', 'CUSTOM_SOFTWARE'],
    { required_error: 'Please select a service type' }
  ),
});

export const step2Schema = z.object({
  projectTitle: z
    .string()
    .trim()
    .min(3, 'Project title must be at least 3 characters')
    .max(120, 'Project title must be at most 120 characters'),
  projectDescription: z
    .string()
    .trim()
    .min(20, 'Please describe your project in at least 20 characters')
    .max(2000, 'Must be at most 2000 characters'),
  problemStatement: z
    .string()
    .trim()
    .min(10, 'Please describe the problem in at least 10 characters')
    .max(1000, 'Must be at most 1000 characters'),
  desiredOutcomes: z
    .string()
    .trim()
    .min(10, 'Please describe desired outcomes in at least 10 characters')
    .max(1000, 'Must be at most 1000 characters'),
  technicalRequirements: z.string().trim().max(800, 'Must be at most 800 characters').optional(),
  existingSystemDetails: z.string().trim().max(800, 'Must be at most 800 characters').optional(),
});

export const step3Schema = z.object({
  budgetRange: z
    .enum(['NOT_DECIDED', 'UNDER_25K', 'FROM_25K_TO_75K', 'FROM_75K_TO_200K', 'ABOVE_200K'])
    .optional(),
  timeline: z
    .enum(['ASAP', 'WITHIN_ONE_MONTH', 'ONE_TO_THREE_MONTHS', 'MORE_THAN_THREE_MONTHS', 'FLEXIBLE'])
    .optional(),
  projectStage: z
    .enum(['IDEA', 'REQUIREMENTS_DEFINED', 'DESIGN_COMPLETED', 'DEVELOPMENT_STARTED', 'EXISTING_IMPROVEMENT'])
    .optional(),
});

export const step4Schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(254, 'Email must be at most 254 characters'),
  companyName: z.string().trim().max(100, 'Company name must be at most 100 characters').optional(),
  consentGiven: z.boolean().refine((v) => v === true, {
    message: 'You must consent to the use of your information to proceed',
  }),
});

export const fullInquirySchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type FullInquiryData = z.infer<typeof fullInquirySchema>;
