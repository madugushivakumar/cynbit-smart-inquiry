// Shared types for the Cynbit Smart Project Brief Builder

export type ServiceType =
  | 'AI_AUTOMATION'
  | 'WEB_APPLICATION'
  | 'MOBILE_APPLICATION'
  | 'BACKEND_CLOUD'
  | 'DIGITAL_MARKETING'
  | 'CUSTOM_SOFTWARE';

export type BudgetRange =
  | 'NOT_DECIDED'
  | 'UNDER_25K'
  | 'FROM_25K_TO_75K'
  | 'FROM_75K_TO_200K'
  | 'ABOVE_200K';

export type Timeline =
  | 'ASAP'
  | 'WITHIN_ONE_MONTH'
  | 'ONE_TO_THREE_MONTHS'
  | 'MORE_THAN_THREE_MONTHS'
  | 'FLEXIBLE';

export type ProjectStage =
  | 'IDEA'
  | 'REQUIREMENTS_DEFINED'
  | 'DESIGN_COMPLETED'
  | 'DEVELOPMENT_STARTED'
  | 'EXISTING_IMPROVEMENT';

export type InquiryStatus = 'NEW' | 'REVIEWING' | 'CONTACTED' | 'CLOSED';

export interface InquiryFormData {
  // Step 1
  serviceType: ServiceType | '';
  // Step 2
  projectTitle: string;
  projectDescription: string;
  problemStatement: string;
  desiredOutcomes: string;
  technicalRequirements: string;
  existingSystemDetails: string;
  // Step 3
  budgetRange?: BudgetRange;
  timeline?: Timeline;
  projectStage?: ProjectStage;
  // Step 4
  name: string;
  email: string;
  companyName: string;
  consentGiven: boolean;
}

export interface InquiryConfirmation {
  referenceCode: string;
  name: string;
  serviceType: ServiceType;
  projectTitle: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
}

export interface ServiceOption {
  value: ServiceType;
  label: string;
  description: string;
  icon: string;
}

export interface BudgetOption {
  value: BudgetRange;
  label: string;
}

export interface TimelineOption {
  value: Timeline;
  label: string;
}

export interface ProjectStageOption {
  value: ProjectStage;
  label: string;
  description: string;
}
