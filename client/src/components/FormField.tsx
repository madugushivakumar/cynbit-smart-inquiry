import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  currentLength?: number;
  maxLength?: number;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  error,
  required,
  hint,
  currentLength,
  maxLength,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="label-text">
          {label}
          {required && <span className="text-indigo-400 ml-1">*</span>}
        </label>
        {maxLength !== undefined && currentLength !== undefined && (
          <span
            className={`text-xs font-medium ${
              currentLength > maxLength * 0.9
                ? currentLength >= maxLength
                  ? 'text-red-400'
                  : 'text-amber-400'
                : 'text-gray-600'
            }`}
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-600 font-medium">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-400 font-medium flex items-center gap-1" role="alert" id={`${id}-error`}>
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function TextInput({ error, className = '', ...props }: TextInputProps) {
  return (
    <input
      {...props}
      className={`input-field ${error ? 'input-field-error' : ''} ${className}`}
      aria-invalid={error ? 'true' : undefined}
    />
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function TextArea({ error, className = '', ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`input-field resize-none ${error ? 'input-field-error' : ''} ${className}`}
      aria-invalid={error ? 'true' : undefined}
    />
  );
}
