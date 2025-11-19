import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
}

const variantClasses: Record<string, string> = {
  default: 'bg-slate-900 text-white hover:bg-slate-800',
  outline: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-900',
  link: 'bg-transparent underline-offset-4 hover:underline text-slate-900',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-1 text-sm',
  default: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2 h-8 w-8',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
          variantClasses[variant] ?? variantClasses.default,
          sizeClasses[size] ?? sizeClasses.default,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
