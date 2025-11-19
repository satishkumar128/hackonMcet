import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Root>{children}</TooltipPrimitive.Root>;
}

export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({ className, side = 'top', ...props }: TooltipPrimitive.TooltipContentProps & { className?: string }) {
  return (
    <TooltipPrimitive.Content
      side={side}
      align="center"
      className={cn('rounded-md bg-slate-900 text-white px-2 py-1 text-sm shadow-md', className)}
      {...props}
    />
  );
}

export { TooltipPrimitive as TooltipPrimitiveExports };
