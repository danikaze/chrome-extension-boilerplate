import React, { FunctionComponent } from 'react';
import { HelloWorld, HellowWorldProps } from '@components/hello-world';

export type AppProps = HellowWorldProps;

export const App: FunctionComponent<AppProps> = ({ saluteWho }) => {
  return <HelloWorld saluteWho={saluteWho} />;
};
