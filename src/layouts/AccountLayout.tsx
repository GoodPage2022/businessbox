import React, { FC } from "react";
import AccountHeader from "../components/Account/AccountHeader";

interface Props {
  children: any;
}

const AccountLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <AccountHeader />
      <div>{children}</div>
    </>
  );
};

export default AccountLayout;
