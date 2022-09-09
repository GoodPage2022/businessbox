import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router'

import React from "react";

import MyBusinesses from "../../src/components/Account/MyBusinesses";
import AccountLayout from "../../src/layouts/AccountLayout";

const MyBusiness: NextPage = () => {
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.user);

  if (user == null) {
    router.push('/')
    return (<></>)
  }

  return (
    <>
      <AccountLayout>
        <MyBusinesses />
      </AccountLayout>
    </>
  );
};

export default MyBusiness;
