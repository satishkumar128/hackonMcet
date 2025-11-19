import * as React from 'react';

type TabsContextValue = {
  value: string;
  onChange?: (v: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export function Tabs({ value, onValueChange, children, className }: { value?: string; onValueChange?: (v: string) => void; children?: React.ReactNode; className?: string }) {
  const [internal, setInternal] = React.useState(value ?? '');
  React.useEffect(() => {
    if (typeof value === 'string') setInternal(value);
  }, [value]);

  const handleChange = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ value: internal, onChange: handleChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div role="tablist" className={className}>{children}</div>;
}

export function TabsTrigger({ value, children, className }: { value: string; children?: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) return null;

  const active = ctx.value === value;
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={() => ctx.onChange?.(value)}
      className={className}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: { value: string; children?: React.ReactNode; className?: string }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) return null;
  return <div hidden={ctx.value !== value} className={className}>{children}</div>;
}

export default Tabs;
