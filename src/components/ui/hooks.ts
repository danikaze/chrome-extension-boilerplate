import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  currentPageSelector,
  settingsSelector,
  snackBarSelector,
} from '@store/selectors';
import { resetDb } from '@utils/storage';

export function useExtensionUi() {
  const dispatch = useDispatch();
  const settings = useSelector(settingsSelector);
  const snackbar = useSelector(snackBarSelector);
  const currentPage = useSelector(currentPageSelector);

  /**
   * Handle the reset of the DB when needed
   */
  useEffect(() => {
    if (!settings.resetDataNext) return;
    resetDb();
  }, [settings.resetDataNext]);

  return {
    snackbar,
    currentPage,
  };
}
