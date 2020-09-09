import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components/app';

const container = document.createElement('div');
document.body.appendChild(container);

const app = <App />;
render(app, container);
