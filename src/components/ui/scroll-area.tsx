import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

export const ScrollArea = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <ScrollAreaPrimitive.Root className={cn('w-full h-full', className)}>
      <ScrollAreaPrimitive.Viewport className="w-full h-full">{children}</ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="flex select-none touch-none p-0">
        <ScrollAreaPrimitive.Thumb className="flex-1 rounded bg-slate-300" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
};

export default ScrollArea;
