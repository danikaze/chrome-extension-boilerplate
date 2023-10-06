/**
 * Definition of all the messages that can be sent between worker/tabs
 *
 * This provides a proper typed interface for
 * - `tabs.sendMessage`
 * - `runtime.sendMessage`
 * - `runtime.onMessage`
 * but needs to be used via
 * - `sendMessageToWorker`
 * - `sendMessageToTab`
 * - `onMessage`
 * utilities provided in [utils/messaging.ts](./utils/messaging.ts)
 */
export type AppMessage = {
  resetData: () => void;
};
