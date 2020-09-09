import * as React from 'react';
import { render } from 'react-dom';
import { App } from '@components/app';

const container = document.createElement('div');
document.body.appendChild(container);

const app = <App />;
render(app, container);

// just show available constants working
// can be removed safely
if (!IS_PRODUCTION) {
  // tslint:disable-next-line:no-console
  console.log({
    PACKAGE_NAME,
    PACKAGE_VERSION,
    COMMIT_HASH,
    COMMIT_HASH_SHORT,
    IS_PRODUCTION,
    GLOBAL_EXAMPLE,
    GLOBAL_SECRET_EXAMPLE,
  });
}
