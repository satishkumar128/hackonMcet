import * as React from 'react';
import { cn } from '@/lib/utils';

export const Badge = ({ className, children, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'outline' | 'secondary' }) => {
  const variantClass =
    variant === 'outline'
      ? 'bg-white border border-slate-200 text-slate-800'
      : variant === 'secondary'
      ? 'bg-slate-100 text-slate-800'
      : 'bg-slate-100 text-slate-800';

  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', variantClass, className)} {...props}>
      {children}
    </span>
  );
};

export default Badge;
