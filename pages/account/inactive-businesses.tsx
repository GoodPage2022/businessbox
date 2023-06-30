import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import React, { useContext } from "react";

import InactiveBusinesses from "../../src/components/Account/InactiveBusinesses";
import AccountLayout from "../../src/layouts/AccountLayout";
import { MainContext } from "../../src/contexts/mainContext";

const MyBusiness: NextPage = () => {
  const [state, dispatch] = useContext(MainContext);
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);

  if (user == null) {
    if (typeof window !== "undefined") {
      localStorage.setItem("redirectToInactiveBusinesses", "true");
      dispatch({ type: "toggle_authModal" });
      router.push("/");
    }
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
