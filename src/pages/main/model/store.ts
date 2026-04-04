import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainPageState {
  isChecked: boolean;
}

const initialState: MainPageState = {
  isChecked: true,
};

export const checkSlice = createSlice({
  name: 'check',
  initialState,
  reducers: {
    setChecked: (state, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
    },
  },
});


export const { setChecked } = checkSlice.actions;
export const checkReducer = checkSlice.reducer;