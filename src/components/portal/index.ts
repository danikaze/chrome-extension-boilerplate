import { FC, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

export type Props = {
  children: ReactNode;
  container?: HTMLElement;
  createWrapper?: (
    container: HTMLElement,
    wrapper?: HTMLElement
  ) => HTMLElement;
};

export const Portal: FC<Props> = ({ children, container, createWrapper }) => {
  const wrapperRef = useRef<HTMLElement>();
  wrapperRef.current = handleWrapper(
    container || document.body,
    createWrapper,
    wrapperRef.current
  );

  return createPortal(children, wrapperRef.current);
};

function handleWrapper(
  container: HTMLElement,
  createWrapper: Props['createWrapper'],
  wrapper: HTMLElement | undefined
): HTMLElement {
  if (!createWrapper) return container;
  return createWrapper(container, wrapper);
}
