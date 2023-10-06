import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { msgLog } from '@utils/logging';

export type PageState = UnknownPage | IndexPage;

export interface UnknownPage {
  page: 'unknown';
}

export interface IndexPage {
  page: 'index';
}

export const pageSlice = createSlice({
  name: 'page',
  initialState: parseUrl(location.href),
  reducers: {
    updateUrl: (state, action: PayloadAction<string>) => {
      let newPage: PageState | undefined;
      try {
        newPage = parseUrl(action.payload);
      } catch {}
      msgLog(`Navigation detected`, newPage);
      return newPage || { page: 'unknown' };
    },
  },
});

export const { updateUrl } = pageSlice.actions;

export const pageReducer = pageSlice.reducer;

function parseUrl(address: string): PageState | undefined {
  try {
    const url = new URL(address);
    if (url.host !== 'your-host.com') {
      throw new Error(`Current URL not supported (${url.href})`);
    }

    if (url.pathname === '/') {
      return { page: 'index' };
    }
  } catch (e) {}

  return { page: 'unknown' };
}
