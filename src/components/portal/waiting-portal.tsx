import { FC, useEffect, useState } from 'react';
import { WaitForOptions, waitFor } from '@utils/wait-for';
import { Portal, Props as PortalProps } from '.';

export type Props = Omit<PortalProps, 'container'> & {
  waitForContainer: () => HTMLElement | null;
  waitForOptions?: Omit<WaitForOptions<null>, 'failValue'>;
};

export const WaitingPortal: FC<Props> = ({
  children,
  waitForOptions,
  waitForContainer,
  createWrapper,
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(
    waitForContainer()
  );

  useEffect(() => {
    if (container) return;
    const options = { ...waitForOptions, failValue: null };
    waitFor<HTMLElement, null>(waitForContainer, options)
      .then((elem) => setContainer(elem))
      .catch(() => {});
  }, [waitForContainer]);

  if (!container) return null;
  return (
    <Portal container={container} createWrapper={createWrapper}>
      {children}
    </Portal>
  );
};
