import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthState, useAuthStore } from "../stores";

export const externalHooks: {
  navigate?: NavigateFunction;
  authStore?: AuthState;
} = {};

export const ExternalHooksSetter = () => {
  externalHooks.navigate = useNavigate();
  externalHooks.authStore = useAuthStore();

  return null;
};
