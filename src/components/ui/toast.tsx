import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '@/lib/utils';

export type ToastProps = ToastPrimitive.ToastProps & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

export type ToastActionElement = React.ReactNode;

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = (props: ToastPrimitive.ToastViewportProps) => (
  <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2" {...props} />
);

export const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastPrimitive.ToastProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Root
      ref={ref}
      className={cn('rounded-md border bg-white p-3 shadow-md', className)}
      {...props}
    />
  )
);

Toast.displayName = 'Toast';

export const ToastTitle = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Title>, ToastPrimitive.ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Title ref={ref} className={cn('font-medium text-sm', className)} {...props} />
  )
);
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Description>, ToastPrimitive.ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Description ref={ref} className={cn('text-sm text-slate-600', className)} {...props} />
  )
);
ToastDescription.displayName = 'ToastDescription';

export const ToastAction = ToastPrimitive.Action;

export default Toast;
