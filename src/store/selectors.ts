import { RootState } from '.';

export const settingsSelector = (state: RootState) => state.settings;

export const currentPageSelector = (state: RootState) => state.page;

export const snackBarSelector = (state: RootState) => state.snackbar[0];
