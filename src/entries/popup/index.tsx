import { createRoot } from 'react-dom/client';
import { msgLog } from '@utils/logging';
import { ExtensionPopup } from '@components/extension-popup';

msgLog('Popup script executed');

const container = document.createElement('div');
document.body.appendChild(container);

const popup = <ExtensionPopup />;
const root = createRoot(container);
root.render(popup);

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
  });
  // tslint:enable:object-literal-shorthand
}
