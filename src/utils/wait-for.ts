export interface WaitForOptions<F> {
  pollTime: number;
  timeout: number;
  failValue: F;
}

export function waitFor<T, F>(
  condition: () => T | F,
  options?: Partial<WaitForOptions<F>>
): Promise<T> {
  const { pollTime, timeout, failValue } = {
    pollTime: 50,
    timeout: 3000,
    failValue: undefined,
    ...options,
  };

  const startTime = Date.now();

  const isResolved = (value: T | F): value is T => value !== failValue;

  return new Promise<T>((resolve, reject) => {
    const check = () => {
      if (Date.now() > startTime + timeout) {
        reject(`waitFor timeout (${timeout}ms.)`);
        return;
      }
      const res = condition();
      if (isResolved(res)) {
        resolve(res);
      } else {
        setTimeout(check, pollTime);
      }
    };

    check();
  });
}
