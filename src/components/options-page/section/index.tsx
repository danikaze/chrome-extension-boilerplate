import { FC, ReactNode } from 'react';

import styles from './section.module.scss';

export interface Props {
  title?: string;
  children: ReactNode;
}

export const Section: FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.root}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
