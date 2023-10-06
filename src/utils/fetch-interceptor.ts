import { msgLog } from './logging';

export type FetchHandler = (response: Response) => void | Promise<void>;

export type FetchHandlerFilter = {
  url?: (url: string) => boolean;
};

export function addFetchHandler(
  handler: FetchHandler,
  filter: FetchHandlerFilter = {}
): void {
  enableFetchInterceptor();
  fetchHandlers.push({ handler, filter });
}

export function removeFetchHandler(handler: FetchHandler): void {
  const index = fetchHandlers.findIndex((obj) => obj.handler === handler);
  if (index === -1) return;
  fetchHandlers.splice(index, 1);
}

let enabled = false;
const fetchHandlers: {
  handler: FetchHandler;
  filter: FetchHandlerFilter;
}[] = [];

function enableFetchInterceptor(): void {
  if (enabled) return;
  enabled = true;

  const originalFn = window.fetch;

  window.fetch = async (...args: Parameters<typeof window.fetch>) => {
    return originalFn(...args).then((response) => {
      handlerFetchResponse(response);
      return response;
    });
  };
}

function handlerFetchResponse(response: Response): void {
  // msgLog('Fetch request intercepted', response.url);

  for (const { handler, filter } of fetchHandlers) {
    if (filter.url && !filter.url(response.url)) continue;
    handler(response);
  }
}
