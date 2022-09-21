import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import React from "react";
import Favorites from "../../src/components/Account/Favorites";

import AccountLayout from "../../src/layouts/AccountLayout";

const MyFavorites: NextPage = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);

  if (user == null) {
    router.push("/");
    return <></>;
  }

  return (
    <>
      <AccountLayout>
        <Favorites />
      </AccountLayout>
    </>
  );
};

export default MyFavorites;
