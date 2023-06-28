import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import React from "react";

import InactiveBusinesses from "../../src/components/Account/InactiveBusinesses";
import AccountLayout from "../../src/layouts/AccountLayout";

const MyBusiness: NextPage = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);

  if (user == null) {
    if (typeof window !== "undefined") router.push("/");
    return <></>;
  }

  return (
    <>
      <AccountLayout>
        <InactiveBusinesses />
      </AccountLayout>
    </>
  );
};

export default MyBusiness;
