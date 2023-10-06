import { FC, useCallback, useMemo } from 'react';

import { WaitingPortal } from '@components/portal/waiting-portal';
import { Snackbar } from '@components/snackbar';
import { useExtensionUi } from './hooks';
import { PageRouter } from './pages';

export const ExtensionUi: FC = () => {
  const { snackbar, currentPage } = useExtensionUi();

  const waitForContainer = useCallback(
    () => document.querySelector<HTMLElement>('selector-for-ui-container'),
    []
  );
  const waitForOptions = useMemo(
    () => ({
      pollTime: 100,
      timeout: 30000,
    }),
    []
  );

  return (
    <>
      {snackbar && <Snackbar {...snackbar} />}
      <WaitingPortal
        waitForContainer={waitForContainer}
        waitForOptions={waitForOptions}
      >
        <div>
          <button>Extension button</button>
        </div>
      </WaitingPortal>
      <PageRouter currentPage={currentPage} />
    </>
  );
};
