import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  menuIsOpen: boolean;
}

const initialState: initialStateType = {
  menuIsOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMenuIsOpen: (state, action: PayloadAction<boolean>) => {
      state.menuIsOpen = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setMenuIsOpen } = globalSlice.actions;
