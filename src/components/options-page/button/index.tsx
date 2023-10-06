import clsx from 'clsx';
import { FunctionComponent, ReactNode } from 'react';

import styles from './user-input-button.module.scss';

export interface Props {
  className?: string;
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export const Button: FunctionComponent<Props> = ({
  className,
  title,
  onClick,
  children,
  disabled,
}) => {
  const classes = clsx(
    styles.root,
    disabled ? styles.disabled : styles.enabled,
    className
  );

  return (
    <div
      className={classes}
      title={title}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
};
