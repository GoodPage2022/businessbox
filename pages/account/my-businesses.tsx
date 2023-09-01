import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

import MyBusinesses from "../../src/components/Account/MyBusinesses";
import AccountLayout from "../../src/layouts/AccountLayout";

const MyBusiness: NextPage = () => {
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
        <MyBusinesses />
      </AccountLayout>
    </>
  );
};

export default MyBusiness;
