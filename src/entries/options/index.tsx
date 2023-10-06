import { createRoot } from 'react-dom/client';
import { msgLog } from '@utils/logging';
import { OptionsPage } from '@components/options-page';

msgLog('Options Page script executed');

const container = document.createElement('div');
document.body.appendChild(container);

const page = <OptionsPage />;
const root = createRoot(container);
root.render(page);
