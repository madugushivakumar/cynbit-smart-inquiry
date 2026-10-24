import { z } from 'zod';

export const ServiceTypeEnum = z.enum([
  'AI_AUTOMATION',
  'WEB_APPLICATION',
  'MOBILE_APPLICATION',
  'BACKEND_CLOUD',
  'DIGITAL_MARKETING',
  'CUSTOM_SOFTWARE',
]);

export const BudgetRangeEnum = z.enum([
  'NOT_DECIDED',
  'UNDER_25K',
  'FROM_25K_TO_75K',
  'FROM_75K_TO_200K',
  'ABOVE_200K',
]);

export const TimelineEnum = z.enum([
  'ASAP',
  'WITHIN_ONE_MONTH',
  'ONE_TO_THREE_MONTHS',
  'MORE_THAN_THREE_MONTHS',
  'FLEXIBLE',
]);

export const ProjectStageEnum = z.enum([
  'IDEA',
  'REQUIREMENTS_DEFINED',
  'DESIGN_COMPLETED',
  'DEVELOPMENT_STARTED',
  'EXISTING_IMPROVEMENT',
]);

export const createInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Invalid email address')
    .max(254, 'Email must be at most 254 characters'),
  companyName: z
    .string()
    .trim()
    .max(100, 'Company name must be at most 100 characters')
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
  serviceType: ServiceTypeEnum,
  projectTitle: z
    .string()
    .trim()
    .min(3, 'Project title must be at least 3 characters')
    .max(120, 'Project title must be at most 120 characters'),
  projectDescription: z
    .string()
    .trim()
    .min(20, 'Please describe your project in at least 20 characters')
    .max(2000, 'Project description must be at most 2000 characters'),
  problemStatement: z
    .string()
    .trim()
    .min(10, 'Problem statement must be at least 10 characters')
    .max(1000, 'Problem statement must be at most 1000 characters'),
  desiredOutcomes: z
    .string()
    .trim()
    .min(10, 'Desired outcomes must be at least 10 characters')
    .max(1000, 'Desired outcomes must be at most 1000 characters'),
  technicalRequirements: z
    .string()
    .trim()
    .max(800, 'Technical requirements must be at most 800 characters')
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
  existingSystemDetails: z
    .string()
    .trim()
    .max(800, 'Existing system details must be at most 800 characters')
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
  budgetRange: BudgetRangeEnum.optional(),
  timeline: TimelineEnum.optional(),
  projectStage: ProjectStageEnum.optional(),
  consentGiven: z
    .boolean()
    .refine((v) => v === true, 'You must consent to the use of your information'),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
