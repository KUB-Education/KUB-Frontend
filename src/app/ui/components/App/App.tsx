import { BrowserRouter } from 'react-router';
import Main from '../Main';
import { useApp } from '@/app/hooks';
import {
  ConfigProvider,
  QueryProvider,
  ServicesProvider,
} from '@/common/contexts';
import { LocalizationProvider, ThemeProvider } from '@/app/contexts';

function App() {
  const { appServices, config } = useApp();

  return (
    <ConfigProvider config={config}>
      <ServicesProvider services={appServices}>
        <QueryProvider>
          <ThemeProvider>
            <LocalizationProvider>
              <BrowserRouter>
                <Main />
              </BrowserRouter>
            </LocalizationProvider>
          </ThemeProvider>
        </QueryProvider>
      </ServicesProvider>
    </ConfigProvider>
  );
}

export default App;
