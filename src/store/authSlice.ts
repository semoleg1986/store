import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  idBuyer: string | null;
  cart: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  idBuyer: null,
  cart: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ token: string; idBuyer: string }>) => {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        idBuyer: action.payload.idBuyer,
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        idBuyer: null,
      };
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
