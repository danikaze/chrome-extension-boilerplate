import { useCallback } from 'react';
import { sendMessageToWorker } from '@utils/messaging';

export function useReset() {
  const reset = useCallback(async () => {
    sendMessageToWorker('resetData');
  }, []);

  return { reset };
}
