import { createContext, ReactNode } from 'react';

export const ConfigContext = createContext<Record<string, unknown>>(null!);

export type ConfigProviderProps = {
  config: Record<string, unknown>;
  children: ReactNode;
};

const ConfigProvider = ({ config, children }: ConfigProviderProps) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export default ConfigProvider;
