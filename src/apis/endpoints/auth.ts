import { MutationFunction, useMutation } from "@tanstack/react-query";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../../models";
import { authRequest } from "../request";
import { MutationOptions } from "../type";

type Response = {
  login: LoginResponse;
  register: RegisterResponse;
};

type Variables = {
  login: LoginPayload;
  register: RegisterPayload;
};

type API = {
  login: MutationFunction<Response["login"], Variables["login"]>;
  register: MutationFunction<Response["register"], Variables["register"]>;
};

const PREFIX = "auth";

const auth: API = {
  login: (data) => authRequest.post(`${PREFIX}/login`, data),
  register: (data) => authRequest.post(`${PREFIX}/register`, data),
};

export const useLoginMutation = (
  options?: MutationOptions<Response["login"], Variables["login"]>
) => useMutation(["login"], auth.login, options);

export const useRegisterMutation = (
  options?: MutationOptions<Response["register"], Variables["register"]>
) => useMutation(["register"], auth.register, options);
