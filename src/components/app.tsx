import React, { FunctionComponent } from 'react';

export interface AppProps {
  saluteWho?: string;
}

export const App: FunctionComponent<AppProps> = ({ saluteWho }) => {
  return <div>Hello {saluteWho || 'World'}</div>;
};
