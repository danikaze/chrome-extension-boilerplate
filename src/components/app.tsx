import React, { FunctionComponent } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '@themes/theme';
import { HelloWorld, HellowWorldProps } from '@components/hello-world';

export type AppProps = HellowWorldProps;

export const App: FunctionComponent<AppProps> = ({ saluteWho }) => {
  return (
    <ThemeProvider theme={theme}>
      <HelloWorld saluteWho={saluteWho} />
    </ThemeProvider>
  );
};
