import type { NextPage } from "next";

import React from "react";

import ContactInfo from "../src/components/Account/ContactInfo";
import AccountLayout from "../src/components/Account/layouts/AccountLayout";

const Account: NextPage = () => {
  return (
    <>
      <AccountLayout>
        <ContactInfo />
      </AccountLayout>
    </>
  );
};

export default Account;
