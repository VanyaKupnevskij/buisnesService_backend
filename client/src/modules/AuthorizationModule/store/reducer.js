import { createSlice } from '@reduxjs/toolkit';

const storageName = 'userData';

const initialState = {
  token: null,
  name: null,
  email: null,
  isAuthorization: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthorization = true;

      localStorage.setItem(
        storageName,
        JSON.stringify({
          token: action.payload.token,
          name: action.payload.name,
          email: action.payload.email,
        }),
      );
    },
    logoutAction: (state, action) => {
      state.token = null;
      state.name = null;
      state.email = null;
      state.isAuthorization = false;

      localStorage.removeItem(storageName);
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
