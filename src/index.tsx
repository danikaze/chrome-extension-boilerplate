import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app';
import { msgLog } from '@utils/logging';

const container = document.createElement('div');
document.body.appendChild(container);

const app = <App />;
const root = createRoot(container);
root.render(app);

// just show available constants working
// can be removed safely
if (!IS_PRODUCTION) {
  // tslint:disable:object-literal-shorthand
  // tslint:disable-next-line:no-console
  msgLog({
    PACKAGE_NAME: PACKAGE_NAME,
    PACKAGE_VERSION: PACKAGE_VERSION,
    COMMIT_HASH: COMMIT_HASH,
    COMMIT_HASH_SHORT: COMMIT_HASH_SHORT,
    IS_PRODUCTION: IS_PRODUCTION,
    GLOBAL_EXAMPLE: GLOBAL_EXAMPLE,
    // GLOBAL_SECRET_EXAMPLE,
  });
  // tslint:enable:object-literal-shorthand
}
