import { AppMessage } from 'src/app-msgs';

export type AppMessageChannel = keyof AppMessage;
export type AppMessageHandler = { removeHandler: () => void };
export type AppMessageListener<T extends AppMessageChannel> = (
  ...data: MessageData<T>
) => void;

type MessageData<T extends AppMessageChannel> = Parameters<AppMessage[T]>;
type MessageResponse<T extends AppMessageChannel> = ReturnType<AppMessage[T]>;
type EncodedMessage<T extends AppMessageChannel> = {
  channel: T;
  data: MessageData<T>;
};

const msgListeners = new Map<
  AppMessageChannel,
  AppMessageListener<AppMessageChannel>[]
>();

/**
 * Just a wrapper over `chrome.runtime.sendMessage` to provide typed messages
 */
export function sendMessageToWorker<T extends AppMessageChannel>(
  channel: T,
  ...data: MessageData<T>
): Promise<MessageResponse<T>> {
  const msg = { channel, data };
  return chrome.runtime.sendMessage<EncodedMessage<T>, MessageResponse<T>>(msg);
}

/**
 * Just a wrapper over `chrome.tabs.sendMessage` to provide typed messages
 */
export function sendMessageToTab<T extends AppMessageChannel>(
  tabId: number,
  channel: T,
  ...data: MessageData<T>
): Promise<MessageResponse<T>> {
  const msg = { channel, data };
  return chrome.tabs.sendMessage<EncodedMessage<T>, MessageResponse<T>>(
    tabId,
    msg
  );
}

/**
 * Wrapper over `chrome.runtime.onMessage` for better typed communication
 */
export function onMessage<T extends AppMessageChannel>(
  channel: T,
  listener: AppMessageListener<T>
): AppMessageHandler {
  addListener(channel, listener);

  return {
    removeHandler: () => removeListener(channel, listener),
  };
}

/**
 * This is the only function that listen to messages and it will distribute
 * incoming messages by channel listeners, kind of how it works on Electron
 */
function globalListener(msg: EncodedMessage<AppMessageChannel>): void {
  const { channel, data } = msg;
  const listeners = msgListeners.get(channel);
  if (!listeners) return;

  for (const listener of listeners) {
    listener(...data);
  }
}

function addListener<T extends AppMessageChannel>(
  channel: AppMessageChannel,
  listener: AppMessageListener<T>
) {
  if (msgListeners.size === 0) {
    chrome.runtime.onMessage.addListener(globalListener);
  }

  const listeners = msgListeners.get(channel) as AppMessageListener<T>[];
  if (!listeners) {
    msgListeners.set(channel, [
      listener,
    ] as AppMessageListener<AppMessageChannel>[]);
  } else {
    listeners.push(listener);
  }
}

function removeListener<T extends AppMessageChannel>(
  channel: AppMessageChannel,
  listener: AppMessageListener<T>
) {
  const listeners = msgListeners.get(channel);
  if (!listeners) return;
  const index = listeners.findIndex((item) => item === listener);
  if (index === -1) return;

  listeners.splice(index, 1);
  if (listener.length === 0) {
    msgListeners.delete(channel);
  }

  if (msgListeners.size === 0) {
    chrome.runtime.onMessage.removeListener(globalListener);
  }
}
