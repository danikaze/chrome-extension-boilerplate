import { FC } from 'react';
import { Button } from '../button';
import { useReset } from './hooks';

export const ResetExtension: FC = () => {
  const { reset } = useReset();

  return (
    <>
      <div>Problems showing data? Try reseting the extension.</div>
      <div>This doesn't affect at all your settings or your data.</div>
      <Button onClick={reset}>Reset data</Button>
    </>
  );
};
