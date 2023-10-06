import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Props as SnackbarProps } from '@components/snackbar';

type SnackbarState = SnackbarProps[];

const initialState: SnackbarState = [];

export const snackbarState = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    queueSnackbar: (state, action: PayloadAction<SnackbarProps>) => {
      state.push({
        ...action.payload,
      });
    },
    removeSnackbar: (state) => {
      state.shift();
    },
  },
});

export const { queueSnackbar, removeSnackbar } = snackbarState.actions;

export const snackbarReducer = snackbarState.reducer;
