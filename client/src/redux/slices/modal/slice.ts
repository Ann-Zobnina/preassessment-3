import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ModalContent, ModalState } from '../../../types/modal';

const initialState: ModalState = {
  title: '',
  content: '',
  show: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalWithError: (state, action: PayloadAction<ModalContent>) => {
      state.title = 'Ошибка!';
      state.content = action.payload;
      state.show = true;
    },
    closeContentModal: (state) => initialState,
    openModalWithSuccess: (state, action: PayloadAction<ModalContent>) => {
      state.title = 'Информация';
      state.content = action.payload;
      state.show = true;
    },
  },
});

export const { openModalWithError, openModalWithSuccess, closeContentModal } = modalSlice.actions;

export default modalSlice.reducer;
