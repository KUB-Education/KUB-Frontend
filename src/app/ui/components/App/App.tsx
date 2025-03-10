import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';
import Main from '../Main';
import { useApp } from '@/app/hooks';
import {
  ConfigProvider,
  QueryProvider,
  ServicesProvider,
} from '@/common/contexts';

const theme = createTheme();

function App() {
  const { appServices, config } = useApp();

  return (
    <ConfigProvider config={config}>
      <ServicesProvider services={appServices}>
        <QueryProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Main />
            </BrowserRouter>
          </ThemeProvider>
        </QueryProvider>
      </ServicesProvider>
    </ConfigProvider>
  );
}

export default App;
