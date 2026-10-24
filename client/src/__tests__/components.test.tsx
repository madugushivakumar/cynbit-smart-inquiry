import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Step1Service } from '../components/Step1Service';
import { Step4Contact } from '../components/Step4Contact';
import { ConfirmationScreen } from '../components/ConfirmationScreen';

const mockOnNext = vi.fn();
const mockOnBack = vi.fn();

const wrapInRouter = (component: React.ReactElement) => (
  <BrowserRouter>{component}</BrowserRouter>
);

describe('Step1Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all service options', () => {
    render(wrapInRouter(<Step1Service data={{}} onNext={mockOnNext} />));
    expect(screen.getByText('AI & Automation')).toBeInTheDocument();
    expect(screen.getByText('Web Application')).toBeInTheDocument();
    expect(screen.getByText('Mobile Application')).toBeInTheDocument();
    expect(screen.getByText('Backend & Cloud')).toBeInTheDocument();
    expect(screen.getByText('Digital Marketing')).toBeInTheDocument();
    expect(screen.getByText('Custom Software / Other')).toBeInTheDocument();
  });

  it('shows validation error when submitting without selection', async () => {
    render(wrapInRouter(<Step1Service data={{}} onNext={mockOnNext} />));
    const button = screen.getByRole('button', { name: /continue/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('allows selecting a service and proceeds', async () => {
    render(wrapInRouter(<Step1Service data={{}} onNext={mockOnNext} />));
    const webAppCard = screen.getByRole('radio', { name: /web application/i });
    await userEvent.click(webAppCard);
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    await userEvent.click(continueBtn);
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledWith(
        expect.objectContaining({ serviceType: 'WEB_APPLICATION' }),
        expect.anything()
      );
    });
  });

  it('preserves previously selected service', () => {
    render(
      wrapInRouter(
        <Step1Service data={{ serviceType: 'AI_AUTOMATION' }} onNext={mockOnNext} />
      )
    );
    const aiCard = screen.getByRole('radio', { name: /ai & automation/i });
    expect(aiCard).toHaveAttribute('aria-checked', 'true');
  });
});

describe('Step4Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates required fields', async () => {
    render(wrapInRouter(<Step4Contact data={{}} onNext={mockOnNext} onBack={mockOnBack} />));
    const submitBtn = screen.getByRole('button', { name: /review submission/i });
    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    });
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    render(wrapInRouter(<Step4Contact data={{}} onNext={mockOnNext} onBack={mockOnBack} />));
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/business email/i), 'not-an-email');
    const submitBtn = screen.getByRole('button', { name: /review submission/i });
    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('requires consent checkbox', async () => {
    render(wrapInRouter(<Step4Contact data={{}} onNext={mockOnNext} onBack={mockOnBack} />));
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/business email/i), 'test@example.com');
    const submitBtn = screen.getByRole('button', { name: /review submission/i });
    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/consent to the use of your information/i);
    });
  });

  it('calls onBack when back button clicked', async () => {
    render(wrapInRouter(<Step4Contact data={{}} onNext={mockOnNext} onBack={mockOnBack} />));
    await userEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(mockOnBack).toHaveBeenCalled();
  });
});

describe('ConfirmationScreen', () => {
  const mockConfirmation = {
    referenceCode: 'CBQ-TEST-ABCD1234',
    name: 'Test User',
    serviceType: 'WEB_APPLICATION' as const,
    projectTitle: 'Test Project',
    status: 'NEW' as const,
    createdAt: new Date().toISOString(),
  };

  it('displays the reference code', () => {
    render(
      wrapInRouter(
        <ConfirmationScreen
          confirmation={mockConfirmation}
          onStartNew={vi.fn()}
        />
      )
    );
    expect(screen.getByText('CBQ-TEST-ABCD1234')).toBeInTheDocument();
  });

  it('displays success message', () => {
    render(
      wrapInRouter(
        <ConfirmationScreen
          confirmation={mockConfirmation}
          onStartNew={vi.fn()}
        />
      )
    );
    expect(screen.getByText(/brief submitted/i)).toBeInTheDocument();
  });

  it('calls onStartNew when clicking start another', async () => {
    const mockStartNew = vi.fn();
    render(
      wrapInRouter(
        <ConfirmationScreen
          confirmation={mockConfirmation}
          onStartNew={mockStartNew}
        />
      )
    );
    await userEvent.click(screen.getByRole('button', { name: /start another/i }));
    expect(mockStartNew).toHaveBeenCalled();
  });
});
