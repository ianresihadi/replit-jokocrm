import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className
}: EmptyStateProps) => {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 max-w-md mx-auto">
        <Icon className="h-16 w-16 mx-auto text-slate-400 dark:text-slate-500 mb-4" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          {description}
        </p>
        {action && (
          <Button 
            onClick={action.onClick}
            className="w-full"
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;