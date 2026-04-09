import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainPageState {
  isOpened: boolean;
}

const initialState: MainPageState = {
  isOpened: false,
};

export const findDiplomaModalSlice = createSlice({
  name: 'findDiplomaModal',
  initialState,
  reducers: {
    setIsOpened: (state, action: PayloadAction<boolean>) => {
      state.isOpened = action.payload;
    },
  },
});


export const { setIsOpened } = findDiplomaModalSlice.actions;
export const findDiplomaModalReducer = findDiplomaModalSlice.reducer;