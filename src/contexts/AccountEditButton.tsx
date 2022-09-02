import React from "react";
import { reducer, initialState } from "../reducers/AccountEditButton";

interface ContextType {
  state: {
    active: boolean;
  };
  dispatch: React.Dispatch<{ type: string; value: unknown }>;
}

export const AccountEditButtonContext = React.createContext<any>({
  state: initialState,
  dispatch: () => null,
});
