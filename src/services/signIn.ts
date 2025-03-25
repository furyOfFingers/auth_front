import { api } from "./api";
import { TSignIn } from "../types/TAuth";

export const postSignIn = (data: TSignIn) => api.post("sign-in", data);
