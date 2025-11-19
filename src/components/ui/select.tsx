import * as React from 'react';
import { cn } from '@/lib/utils';

// A lightweight, markup-compatible Select helper.
// It intentionally supports the simple usage pattern used in pages: children contain SelectItem elements.

export function Select({ value, onValueChange, children, className }: { value?: string; onValueChange?: (v: string) => void; children?: React.ReactNode; className?: string }) {
  // Collect options from children that look like SelectItem elements (have props.value)
  const items: Array<{ value: string; label: React.ReactNode }> = [];
  React.Children.forEach(children, (child) => {
    if (!child || typeof child === 'boolean') return;
    if (React.isValidElement(child)) {
      const childProps: any = child.props;
      if (child.type && (child.type as any).displayName === 'SelectItem' && childProps.value) {
        items.push({ value: String(childProps.value), label: childProps.children });
      }
      // support simple structure where SelectContent wraps SelectItem
      if (Array.isArray(childProps.children)) {
        React.Children.forEach(childProps.children, (c) => {
          if (React.isValidElement(c) && (c.type as any).displayName === 'SelectItem') {
            const p: any = c.props;
            items.push({ value: String(p.value), label: p.children });
          }
        });
      }
    }
  });

  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className={cn('rounded border px-3 py-2', className)}
    >
      {items.map((it) => (
        <option key={it.value} value={it.value}>{it.label}</option>
      ))}
    </select>
  );
}

export function SelectTrigger({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectContent({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }: { value: string; children?: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}
SelectItem.displayName = 'SelectItem';

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <>{placeholder}</>;
}

export default Select;
