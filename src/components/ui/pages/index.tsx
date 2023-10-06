import { FC } from 'react';
import { PageState } from '@store/features/page';

export interface Props {
  currentPage: PageState | undefined;
}

export const PageRouter: FC<Props> = ({ currentPage }) => {
  if (!currentPage) return null;

  // if (currentPage.page === 'xxx') {
  //   return <XxxPage />;
  // }

  return null;
};
