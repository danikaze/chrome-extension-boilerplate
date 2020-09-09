import React, { FunctionComponent } from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { theme } from '../themes/theme';
import { HelloWorld, HellowWorldProps } from './hello-world';

export type AppProps = HellowWorldProps;

export const App: FunctionComponent<AppProps> = ({ saluteWho }) => {
  return (
    <ThemeProvider theme={theme}>
      <HelloWorld saluteWho={saluteWho} />
    </ThemeProvider>
  );
};
