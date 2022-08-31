import type { NextPage } from "next";

import React from "react";

import ContactInfo from "../../src/components/Account/ContactInfo";
import AccountLayout from "../../src/layouts/AccountLayout";
import MyBusinesses from "../../src/components/Account/MyBusinesses";

const Account: NextPage = () => {
  return (
    <>
      <AccountLayout>{/* <MyBusinesses /> */}</AccountLayout>
    </>
  );
};

export default Account;
