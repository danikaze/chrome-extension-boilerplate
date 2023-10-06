export type UrlChangeHandler = (newUrl: string, oldUrl: string) => void;

const INTERVAL_MS = 100;
const handlers: UrlChangeHandler[] = [];
let lastUrl: string = location.href;
let interval: ReturnType<typeof setInterval> | undefined;

/**
 * Allows to track url changes on Single Page Applications
 */
export function addUrlChangeHandler(handler: UrlChangeHandler): void {
  handlers.push(handler);

  if (handlers.length === 1) {
    interval = setInterval(poll, INTERVAL_MS);
  }
}

export function removeUrlChangeHandler(handler: UrlChangeHandler): void {
  const index = handlers.indexOf(handler);
  if (index === -1) return;
  handlers.splice(index, 1);

  if (handlers.length === 0) {
    clearInterval(interval);
    interval = undefined;
  }
}

/*
 * Sometimes, it's just safer and easier to poll over the current URL to detect
 * changes instead of set listeners and history handlers...
 *
 * Also because there's no need to react in real time
 * and no real impact on performance
 */
function poll(): void {
  const newUrl = location.href;
  if (newUrl === lastUrl) return;

  for (const handler of handlers) {
    handler(newUrl, lastUrl);
  }

  lastUrl = newUrl;
}
