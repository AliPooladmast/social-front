import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
  isFetching: false,
  error: false,
  success: false,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    applicationStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.success = false;
    },
    applicationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getApplicationSuccess: (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.applications = action.payload;
    },
    deleteApplicationSuccess: (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.applications.splice(
        state.applications.findIndex((item) => item._id === action.payload),
        1
      );
    },
    addApplicationSuccess: (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.applications.push(action.payload);
    },
  },
});

export const {
  applicationStart,
  applicationFailure,
  getApplicationSuccess,
  deleteApplicationSuccess,
  addApplicationSuccess,
} = applicationSlice.actions;
export default applicationSlice.reducer;
