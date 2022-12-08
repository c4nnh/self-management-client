import { LoginResponse, User } from "../models";
import create from "zustand";
import { clearTokens, setTokens } from "../utils";

export type AuthState = {
  user?: User;
  me: (user: User) => void;
  login: (response: LoginResponse) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  login: (response) => {
    const { user, token } = response;
    set({
      user: {
        ...user,
      },
    });
    setTokens(token);
  },
  logout: () => {
    set({
      user: undefined,
    });
    clearTokens();
  },
  me: (user) => {
    set({
      user,
    });
  },
}));
