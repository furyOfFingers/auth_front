import { create } from "zustand";

import { ERequestStatus } from "../enums/requests";
import { TSignIn } from "../types/TAuth";
import { postSignIn } from "../services/signIn";

interface IAuthStore {
  reqStatus: ERequestStatus;
  data: object;
  error: Error | null;
  signIn: (data: TSignIn) => Promise<void>;
  getAuthLoading: () => boolean;
  // signUp: (data: IAuthSignUp) => Promise<void>;
  // logOut: () => Promise<void>;
  // setShowAuthModal: (showAuthModal: boolean) => void;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  reqStatus: ERequestStatus.IDLE,
  data: {},
  error: null,
  showAuthModal: false,

  signIn: async (data: TSignIn) => {
    set({ reqStatus: ERequestStatus.PENDING, error: null });

    return postSignIn(data)
      .then((res) => {
        set({ data: res });
        set({ reqStatus: ERequestStatus.SUCCESS });
      })
      .catch((error) => {
        set({ error: error, reqStatus: ERequestStatus.FAIL });
        // notification.error({
        //   message: error.response.data.message,
        //   description: error.response.data.description,
        // });
      })
      .finally(() => set({ reqStatus: ERequestStatus.IDLE }));
  },

  //   signUp: async (data: IAuthSignUp) => {
  //     set({ reqStatus: ERequestStatus.PENDING, error: null });

  //     return signUp(data)
  //       .then((res) => {
  //         set({ data: res });
  //         set({ reqStatus: ERequestStatus.SUCCESS });

  //         set({ showAuthModal: true });
  //       })
  //       .catch((error) => {
  //         set({ error: error, reqStatus: ERequestStatus.FAIL });
  //         notification.error({
  //           message: error.response.data.message,
  //           description: error.response.data.description,
  //         });
  //       })
  //       .finally(() => set({ reqStatus: ERequestStatus.IDLE }));
  //   },

  //   logOut: async () => {
  //     set({ reqStatus: ERequestStatus.PENDING, error: null });

  //     return logOut()
  //       .then(() => set({ reqStatus: ERequestStatus.SUCCESS }))
  //       .catch((error) => {
  //         set({ error: error, reqStatus: ERequestStatus.FAIL });
  //         notification.error({
  //           message: error.response.data.message,
  //           description: error.response.data.description,
  //         });
  //       })
  //       .finally(() => set({ reqStatus: ERequestStatus.IDLE }));
  //   },

  getAuthLoading: () => get().reqStatus === ERequestStatus.PENDING,

  //   setShowAuthModal: (showAuthModal: boolean) => set({ showAuthModal }),
}));
