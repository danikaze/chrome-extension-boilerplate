import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { resetDb } from '@utils/storage';

export interface SettingsState {
  lastCheckedUpdate: string;
  resetDataNext: boolean;
}

export const DEFAULT_SETTINGS: SettingsState = {
  lastCheckedUpdate: '0.1.0',
  resetDataNext: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: DEFAULT_SETTINGS,
  reducers: {
    setSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetData: (state) => {
      resetDb();

      return {
        ...state,
        resetDataNext: false,
      };
    },
  },
});

export const { setSettings, resetData } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
