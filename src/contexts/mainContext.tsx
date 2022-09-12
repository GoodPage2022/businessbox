import React from "react";
import { reducer, initialState } from "../reducers/MainReducer";

interface ContextType {
  state: {
    isEdit: boolean;
    isActiveModalAuth: boolean;
    isActiveModalRegistration: boolean;
    isActiveModalForgotPassword: boolean;
  };
  dispatch: React.Dispatch<{ type: string; value: unknown }>;
}

export const MainContext = React.createContext<any>({
  state: initialState,
  dispatch: () => null,
});
