import { loadSettings, storeSettings } from '@utils/logic/storage';
import { msgLog } from '@utils/logging';
import { onMessage } from '@utils/messaging';
import {
  WindowWithExtensionApi,
  getExtensionApi,
} from '@src/utils/global-functions';

const NAVIGATION_FILTER: chrome.webNavigation.WebNavigationEventFilter = {
  url: [{ urlMatches: 'https://your-host.com/*' }],
};

const BROWSER_TAB_IDS: number[] = [];

/**
 * Check when the web app is loaded to execute the UI script.
 */
export function setupScriptInjector(): void {
  chrome.storage.sync.onChanged.addListener(settingsSynchronizer);

  chrome.webNavigation.onCompleted.addListener(async (data) => {
    msgLog('webNavigation.onCompleted', data);
    const { tabId } = data;

    trackTab(tabId);

    await injectScript(tabId);
    await sendSettings(tabId);
  }, NAVIGATION_FILTER);

  onMessage('resetData', resetData);
}

/**
 * Inject the ui.js script into the specified tab
 */
async function injectScript(tabId: number): Promise<void> {
  try {
    await chrome.scripting.executeScript({
      injectImmediately: true,
      target: { tabId: tabId },
      files: ['ui.js'],
      world: 'MAIN',
    });
  } catch (e) {
    if (/No tab with id/i.test(String(e))) {
      untrackTab(tabId);
    } else {
      msgLog(e);
    }
  }
}

/**
 * Send the last version of the settings to the specified tab
 */
async function sendSettings(tabId: number): Promise<void> {
  const settings = await loadSettings();
  try {
    await chrome.scripting.executeScript({
      injectImmediately: true,
      target: { tabId },
      world: 'MAIN',
      func: (settings) => {
        (window as WindowWithExtensionApi)[
          WINDOW_GLOBAL_API_VARNAME
        ]?.updateSettings(settings);
      },
      args: [settings],
    });
  } catch (e) {
    if (/No tab with id/i.test(String(e))) {
      untrackTab(tabId);
    } else {
      msgLog(e);
    }
  }
}

async function resetData() {
  msgLog(`Resetting Extension Data`);

  for (const tabId of BROWSER_TAB_IDS) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        func: () => {
          (window as WindowWithExtensionApi)[
            WINDOW_GLOBAL_API_VARNAME
          ]?.resetData();
        },
      });
      // once one tab receives the message, we finished
      return;
    } catch (e) {
      if (/No tab with id/i.test(String(e))) {
        untrackTab(tabId);
      } else {
        msgLog(e);
      }
    }
  }

  // if no tab received the message (maybe no tabs with the extension host were open)
  // set it in the settings so the next time it's applied
  storeSettings({ resetDataNext: true });
}

function settingsSynchronizer(): void {
  msgLog(`Synchronizing settings with ${BROWSER_TAB_IDS.length} tabs`);
  for (const tabId of BROWSER_TAB_IDS) {
    sendSettings(tabId);
  }
}

function trackTab(tabId: number): void {
  if (!BROWSER_TAB_IDS.includes(tabId)) {
    BROWSER_TAB_IDS.push(tabId);
  }
}

function untrackTab(tabId: number): void {
  const i = BROWSER_TAB_IDS.indexOf(tabId);
  if (i === -1) return;
  BROWSER_TAB_IDS.splice(i, 1);
}
