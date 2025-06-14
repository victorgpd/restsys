import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAccount, IUser } from "../../types/types";

interface initialStateType {
  menuIsOpen: boolean;
  user: IUser | null;
  account: IAccount | null;
}

const initialState: initialStateType = {
  menuIsOpen: false,
  user: null,
  account: null,
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
    setAccount: (state, action: PayloadAction<IAccount | null>) => {
      state.account = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { setMenuIsOpen, setUser, setAccount } = globalSlice.actions;
