'use client';

import { ReactNode, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  children?: ReactNode;
  as?: 'input' | 'textarea' | 'select';
}

export function FormField({
  label,
  error,
  helpText,
  children,
  as: Component = 'input',
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-navy">
        {label}
        {props.required && <span className="text-cta-red">*</span>}
      </label>

      {Component === 'input' && (
        <input
          {...props}
          className={clsx(
            'w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors',
            error ? 'border-cta-red' : 'border-gray-300',
            className
          )}
        />
      )}

      {Component === 'textarea' && (
        <textarea
          {...(props as any)}
          className={clsx(
            'w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors resize-none',
            error ? 'border-cta-red' : 'border-gray-300',
            className
          )}
        />
      )}

      {Component === 'select' && (
        <select
          {...(props as any)}
          className={clsx(
            'w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors',
            error ? 'border-cta-red' : 'border-gray-300',
            className
          )}
        >
          {children}
        </select>
      )}

      {error && <p className="text-sm text-cta-red">{error}</p>}
      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}
