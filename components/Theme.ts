import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#006FBA',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});
