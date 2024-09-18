// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8', // Brighter blue
    },
    secondary: {
      main: '#ff4081', // Pink
    },
    background: {
      default: '#f5f5f5', // Light background for the whole app
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1.2rem',
    },
    button: {
      textTransform: 'none', // Prevents capitalization on buttons
    },
  },
  shape: {
    borderRadius: 8, // Slightly rounded corners on all components
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          display: 'none', // Hides the asterisk for required fields
        },
      },
    },
  },
});

export default theme;

