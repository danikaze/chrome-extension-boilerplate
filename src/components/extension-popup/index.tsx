import { FC } from 'react';
import icon from '@img/icon48.png';

import styles from './extension-popup.module.scss';

export const ExtensionPopup: FC = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        <img src={chrome.runtime.getURL(icon)} />
        Extension Popup
      </h1>
    </div>
  );
};
