import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showErrorModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowErrorModal(state) {
      state.showErrorModal = !state.showErrorModal;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
