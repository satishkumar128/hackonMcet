import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0-100
}

export const Progress = ({ value = 0, className, ...props }: ProgressProps) => {
  return (
    <div className={cn('w-full bg-gray-100 rounded-md overflow-hidden', className)} {...props}>
      <div
        className="h-2 bg-emerald-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
      />
    </div>
  );
};

export default Progress;
