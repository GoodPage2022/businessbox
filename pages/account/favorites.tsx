import type { NextPage } from "next";

import React from "react";
import Favorites from "../../src/components/Account/Favorites";

import AccountLayout from "../../src/layouts/AccountLayout";

const MyFavorites: NextPage = () => {
  return (
    <>
      <AccountLayout>
        <Favorites />
      </AccountLayout>
    </>
  );
};

export default MyFavorites;
