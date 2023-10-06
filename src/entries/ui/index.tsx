import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { msgLog } from '@utils/logging';
import { ExtensionUi } from '@components/ui';
import { store } from '@store';

import { interceptApiData } from './api';
import { trackUrlChanges } from './url';
import { setGlobalFunctions } from '../../utils/global-functions';

msgLog('UI script executed');
setGlobalFunctions(store.dispatch);
interceptApiData(store.dispatch);
trackUrlChanges(store.dispatch);

/*
 * Inject the UI
 */
const container = document.createElement('div');
container.id = 'extension-root';
document.body.appendChild(container);

const root = createRoot(container);
const app = (
  <Provider store={store}>
    <ExtensionUi />
  </Provider>
);
root.render(app);
