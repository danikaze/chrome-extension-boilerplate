import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import icon from '@img/icon96.png';

import styles from './hello-world.module.scss';

export interface HellowWorldProps {
  saluteWho?: string;
}

export const HelloWorld: FunctionComponent<HellowWorldProps> = ({
  saluteWho,
}) => {
  return (
    <div className={clsx(styles.card)}>
      <img alt="Example of img usage" src={chrome.runtime.getURL(icon)} />
      <div className={styles.text}>Hello {saluteWho}</div>
    </div>
  );
};

HelloWorld.defaultProps = {
  saluteWho: 'World',
};
