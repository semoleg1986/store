import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  idBuyer: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  idBuyer: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ token: string, idBuyer: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.idBuyer = action.payload.idBuyer;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.idBuyer = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
