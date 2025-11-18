import { LocalizationProvider as LibLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReactNode } from 'react';

export type LocalizationProviderProps = {
  children: ReactNode;
};

const LocalizationProvider = ({ children }: LocalizationProviderProps) => {
  return (
    <LibLocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LibLocalizationProvider>
  );
};

export default LocalizationProvider;
