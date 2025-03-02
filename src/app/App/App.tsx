import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';
import { QueryProvider } from '../../coomon/queries/ui';
import Main from '../Main';

const theme = createTheme();

function App() {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
