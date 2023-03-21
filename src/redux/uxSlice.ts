import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMessage {
  type: string;
  text: string | null;
}

export interface uxState {
  message: IMessage;
  loading: boolean;
  displaySideMenu: boolean;
}

const initialState: uxState = {
  message: { type: "info", text: null },
  loading: false,
  displaySideMenu: false,
};

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<IMessage>) => {
      state.message = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    sideMenuToggle: (state) => {
      state.displaySideMenu = !state.displaySideMenu;
    },
  },
});

export const { setMessage, setLoading, sideMenuToggle } = styleSlice.actions;
export default styleSlice.reducer;
