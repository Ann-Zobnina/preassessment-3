import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../../types/auth';
import { loginThunk, logoutThunk, refreshAuth, registerThunk } from './thunks';

const initialState: AuthState = {
  accessToken: '',
  user: {
    status: 'unknown',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login: (state, action: PayloadAction<AuthState>) => action.payload,
    // logout: (state) => {
    //   state.user.status = 'guest';
    //   state.accessToken = '';
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(registerThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(refreshAuth.fulfilled, (state, action) => action.payload);
    builder.addCase(refreshAuth.rejected, (state) => {
      state.user.status = 'guest';
    });
    builder.addCase(logoutThunk.fulfilled, (state => {
      // state.user = { status: 'guest' };
      state.user.status = 'guest';
      state.accessToken = '';  
    }));
  },
});

// Action creators are generated for each case reducer function
// export const { } = authSlice.actions;

export default authSlice.reducer;
