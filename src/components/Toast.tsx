import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'error';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 flex justify-center pointer-events-none transition-all duration-300 animate-slide-up">
      <div className="bg-primary text-on-primary px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 max-w-sm border border-secondary/20">
        {type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-secondary-fixed flex-shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
        )}
        <span className="text-xs font-semibold leading-tight text-on-primary">{message}</span>
      </div>
    </div>
  );
};
