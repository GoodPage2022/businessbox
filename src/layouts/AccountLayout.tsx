import React, { FC } from "react";
import AccountHeader from "../components/Account/AccountHeader";
import { AccountEditButtonContext } from "../contexts/AccountEditButton";
import { reducer, initialState } from "../reducers/AccountEditButton";
interface Props {
  children: any;
}

const AccountLayout: FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      <AccountEditButtonContext.Provider value={[state, dispatch]}>
        <AccountHeader />
        <div>{children}</div>
      </AccountEditButtonContext.Provider>
    </>
  );
};

export default AccountLayout;
