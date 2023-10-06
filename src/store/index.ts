import { configureStore } from '@reduxjs/toolkit';

import { pageReducer } from './features/page';
import { settingsReducer } from './features/settings';
import { snackbarReducer } from './features/snackbar';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    page: pageReducer,
    snackbar: snackbarReducer,
  },
});

export type Store = typeof store;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];
