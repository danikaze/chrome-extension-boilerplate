import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

// tslint:disable:no-magic-numbers
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      paper: purple[100],
    },
  },
});
