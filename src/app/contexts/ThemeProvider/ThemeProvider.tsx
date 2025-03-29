import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

export type ThemeProviderProps = {
  children: ReactNode;
};

const theme = createTheme({
  typography: {
    fontFamily: 'E-Ukraine, Roboto, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'E-Ukraine';
          src: url('/fonts/e-ukraine/e-ukraine-regular.woff2') format('woff2'),
          url('/fonts/e-ukraine/e-ukraine-regular.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'E-Ukraine';
          src: url('/fonts/e-ukraine/e-ukraine-medium.woff2') format('woff2'),
          url('/fonts/e-ukraine/e-ukraine-medium.woff') format('woff');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'E-Ukraine';
          src: url('/fonts/e-ukraine/e-ukraine-bold.woff2') format('woff2'),
          url('/fonts/e-ukraine/e-ukraine-bold.woff') format('woff');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
      `,
    },
  },
});

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
