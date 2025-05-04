import React from 'react';
import { Button } from './button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

const ErrorState = ({
  title = "Terjadi Kesalahan",
  description = "Maaf, terjadi kesalahan saat memuat data. Silakan coba lagi nanti.",
  actionText = "Coba Lagi",
  onAction = () => window.location.reload()
}: ErrorStateProps) => {
  return (
    <div className="text-center py-8">
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-red-500 dark:text-red-400 mb-2 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-center">{title}</h3>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-4">{description}</p>
        <Button onClick={onAction} className="w-full">
          {actionText}
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;