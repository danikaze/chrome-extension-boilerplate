import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { SNACKBAR_MS_BEFORE_HIDE } from '@utils/constants';
import { removeSnackbar } from '@store/features/snackbar';

export function useSnackbar() {
  const dispatch = useDispatch();
  const [isClosing, startClosing] = useState(false);
  const closeSnackbar = useCallback(() => {
    dispatch(removeSnackbar());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(
      () => startClosing(true),
      SNACKBAR_MS_BEFORE_HIDE
    );
    return () => clearTimeout(timeout);
  }, []);

  return { isClosing, closeSnackbar };
}
