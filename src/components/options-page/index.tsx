import { FC } from 'react';
import { ChangeLog } from '@components/options-page/change-log';
import icon from '@img/icon48.png';

import styles from './options-page.module.scss';
import { Section } from './section';
import { useOptionsPage } from './hooks';
import { ResetExtension } from './reset';

export const OptionsPage: FC = () => {
  const { settings } = useOptionsPage();

  return (
    <div className={styles.root}>
      <h1 className={styles.header}>
        <div className={styles.headerContainer}>
          <img src={chrome.runtime.getURL(icon)} />
          <div className={styles.text}>
            <div className={styles.title}>Options</div>
            <div className={styles.subtitle}>Options page</div>
          </div>
        </div>
      </h1>
      <div className={styles.container}>
        <Section title="Changelog">
          <ChangeLog />
        </Section>
        <Section title="Reset extension data">
          <ResetExtension />
        </Section>
      </div>
      <div className={styles.bg} />
    </div>
  );
};
