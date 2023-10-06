import { FC } from 'react';
import { clsx } from 'clsx';
import { Portal } from '@components/portal';
import { useSnackbar } from './hook';

import styles from './snackbar.module.scss';

export interface Props {
  text: string;
  style?: 'error';
}

export const Snackbar: FC<Props> = ({ text }) => {
  const { isClosing, closeSnackbar } = useSnackbar();

  return (
    <Portal>
      <div
        className={clsx(styles.root, isClosing && styles.closing)}
        onTransitionEnd={closeSnackbar}
      >
        <div className={styles.snackbar}>
          <div className={styles.text}>{text}</div>
          <div className={styles.closeButton} onClick={closeSnackbar}>
            ✖
          </div>
        </div>
      </div>
    </Portal>
  );
};
