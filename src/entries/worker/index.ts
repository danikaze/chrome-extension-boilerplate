import { msgLog } from '@utils/logging';
import { onMessage } from '@utils/messaging';
import { setupScriptInjector } from './script-injector';

msgLog('Worker running');

onMessage('resetData', () => {});

setupScriptInjector();
