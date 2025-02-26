import { createTheme, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained">Hello world</Button>
    </ThemeProvider>
  );
}

export default App;
