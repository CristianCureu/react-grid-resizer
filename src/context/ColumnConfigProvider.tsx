import type { ColumnConfig, ConfigItem } from "@src/types/index";
import { createContext, useContext, useState } from "react";

type ColumnConfigContextType<K> = {
  getContextConfig: (context: K) => readonly ConfigItem[];
  setWidth: (context: K, columnId: string, newWidth: string) => void;
};

const ColumnConfigContext = createContext<ColumnConfigContextType<any> | undefined>(
  undefined
);

function useColumnConfig<K>() {
  const ctx = useContext(ColumnConfigContext);
  if (!ctx) throw new Error("useColumnConfig must be used within ColumnConfigProvider");
  return ctx as ColumnConfigContextType<K>;
}

type ProviderProps<K extends string> = {
  children: React.ReactNode;
  initialConfig: ColumnConfig<K>;
};

function ColumnConfigProvider<K extends string>({
  children,
  initialConfig,
}: ProviderProps<K>) {
  const [config, setConfig] = useState<ColumnConfig<K>>(initialConfig);

  const getContextConfig = (context: K): readonly ConfigItem[] => {
    return config[context] ?? [];
  };

  const setWidth = (context: K, columnId: string, newWidth: string) => {
    setConfig((prev) => {
      const contextConfig = prev[context] ?? [];

      const updated = contextConfig.map((col) =>
        col.id === columnId ? { ...col, width: newWidth } : { ...col }
      );

      return { ...prev, [context]: updated };
    });
  };

  return (
    <ColumnConfigContext.Provider value={{ getContextConfig, setWidth }}>
      {children}
    </ColumnConfigContext.Provider>
  );
}

export { ColumnConfigProvider, useColumnConfig };
