import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import Favorites from "../../src/components/Account/Favorites";

import AccountLayout from "../../src/layouts/AccountLayout";

const MyFavorites: NextPage = () => {
  const router = useRouter();
  const userSelector = useSelector((state: any) => state.auth.user);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(userSelector);
  }, [userSelector]);
  useEffect(() => {
    if (user == null) {
      router.push("/");
      // return <></>;
    }
  }, [user, router]);
  return (
    <>
      <AccountLayout>
        <Favorites />
      </AccountLayout>
    </>
  );
};

export default MyFavorites;
