'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div
        className={clsx(
          'relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto',
          sizeClasses[size]
        )}
      >
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-lg">
          <h2 className="text-xl font-bold text-navy">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-light-bg rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-light-bg rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
