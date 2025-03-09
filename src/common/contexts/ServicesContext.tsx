import { createContext, ReactNode } from 'react';
import { BaseService } from '../services';

export const ServicesContext = createContext<Record<string, BaseService>>(
  null!,
);

export type ServicesProviderProps = {
  children: ReactNode;
  services: Record<string, BaseService>;
};

const ServicesProvider = ({ children, services }: ServicesProviderProps) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
