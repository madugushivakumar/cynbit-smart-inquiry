import type {
  ServiceOption,
  BudgetOption,
  TimelineOption,
  ProjectStageOption,
} from '../types';

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    value: 'AI_AUTOMATION',
    label: 'AI & Automation',
    description: 'Autonomous AI agents, LLM integrations, workflow automation',
    icon: '🤖',
  },
  {
    value: 'WEB_APPLICATION',
    label: 'Web Application',
    description: 'Full-stack web platforms, SaaS products, portals',
    icon: '🌐',
  },
  {
    value: 'MOBILE_APPLICATION',
    label: 'Mobile Application',
    description: 'iOS, Android, or cross-platform mobile apps',
    icon: '📱',
  },
  {
    value: 'BACKEND_CLOUD',
    label: 'Backend & Cloud',
    description: 'APIs, microservices, cloud infrastructure (AWS/Azure)',
    icon: '☁️',
  },
  {
    value: 'DIGITAL_MARKETING',
    label: 'Digital Marketing',
    description: 'Technical SEO, performance ads, CRM automation',
    icon: '📈',
  },
  {
    value: 'CUSTOM_SOFTWARE',
    label: 'Custom Software / Other',
    description: 'Legacy modernization, custom tooling, or other needs',
    icon: '⚙️',
  },
];

export const BUDGET_OPTIONS: BudgetOption[] = [
  { value: 'NOT_DECIDED', label: 'Not decided yet' },
  { value: 'UNDER_25K', label: 'Under ₹25,000' },
  { value: 'FROM_25K_TO_75K', label: '₹25,000 – ₹75,000' },
  { value: 'FROM_75K_TO_200K', label: '₹75,000 – ₹2,00,000' },
  { value: 'ABOVE_200K', label: 'Above ₹2,00,000' },
];

export const TIMELINE_OPTIONS: TimelineOption[] = [
  { value: 'ASAP', label: 'As soon as possible' },
  { value: 'WITHIN_ONE_MONTH', label: 'Within 1 month' },
  { value: 'ONE_TO_THREE_MONTHS', label: '1–3 months' },
  { value: 'MORE_THAN_THREE_MONTHS', label: 'More than 3 months' },
  { value: 'FLEXIBLE', label: 'Flexible / Undecided' },
];

export const PROJECT_STAGE_OPTIONS: ProjectStageOption[] = [
  { value: 'IDEA', label: 'Idea Stage', description: 'I have a concept but nothing built yet' },
  {
    value: 'REQUIREMENTS_DEFINED',
    label: 'Requirements Defined',
    description: 'I know what I need, ready to plan',
  },
  {
    value: 'DESIGN_COMPLETED',
    label: 'Design Completed',
    description: 'Designs/wireframes are ready',
  },
  {
    value: 'DEVELOPMENT_STARTED',
    label: 'Development Started',
    description: 'Some development has begun',
  },
  {
    value: 'EXISTING_IMPROVEMENT',
    label: 'Existing System Improvement',
    description: 'Enhancing or modernizing an existing system',
  },
];

export const STEPS = [
  { number: 1, title: 'Service', short: 'Service' },
  { number: 2, title: 'Project Details', short: 'Details' },
  { number: 3, title: 'Budget & Timeline', short: 'Budget' },
  { number: 4, title: 'Contact Info', short: 'Contact' },
  { number: 5, title: 'Review & Submit', short: 'Review' },
];

export const SERVICE_LABELS: Record<string, string> = {
  AI_AUTOMATION: 'AI & Automation',
  WEB_APPLICATION: 'Web Application',
  MOBILE_APPLICATION: 'Mobile Application',
  BACKEND_CLOUD: 'Backend & Cloud',
  DIGITAL_MARKETING: 'Digital Marketing',
  CUSTOM_SOFTWARE: 'Custom Software / Other',
};

export const BUDGET_LABELS: Record<string, string> = {
  NOT_DECIDED: 'Not decided yet',
  UNDER_25K: 'Under ₹25,000',
  FROM_25K_TO_75K: '₹25,000 – ₹75,000',
  FROM_75K_TO_200K: '₹75,000 – ₹2,00,000',
  ABOVE_200K: 'Above ₹2,00,000',
};

export const TIMELINE_LABELS: Record<string, string> = {
  ASAP: 'As soon as possible',
  WITHIN_ONE_MONTH: 'Within 1 month',
  ONE_TO_THREE_MONTHS: '1–3 months',
  MORE_THAN_THREE_MONTHS: 'More than 3 months',
  FLEXIBLE: 'Flexible / Undecided',
};

export const PROJECT_STAGE_LABELS: Record<string, string> = {
  IDEA: 'Idea Stage',
  REQUIREMENTS_DEFINED: 'Requirements Defined',
  DESIGN_COMPLETED: 'Design Completed',
  DEVELOPMENT_STARTED: 'Development Started',
  EXISTING_IMPROVEMENT: 'Existing System Improvement',
};
