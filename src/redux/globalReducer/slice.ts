import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../types/types";

interface initialStateType {
  menuIsOpen: boolean;
  user: IUser | null;
}

const initialState: initialStateType = {
  menuIsOpen: true,
  user: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMenuIsOpen: (state, action: PayloadAction<boolean>) => {
      state.menuIsOpen = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setMenuIsOpen, setUser } = globalSlice.actions;
