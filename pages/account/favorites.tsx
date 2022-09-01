import type { NextPage } from "next";

import React from "react";

import MyBusinesses from "../../src/components/Account/MyBusinesses";
import AccountLayout from "../../src/layouts/AccountLayout";

const MyFavorites: NextPage = () => {
  return (
    <>
      <AccountLayout>
        <MyBusinesses />
      </AccountLayout>
    </>
  );
};

export default MyFavorites;
