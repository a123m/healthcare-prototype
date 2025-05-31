import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    role: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: { auth: authSlice.reducer },
});
