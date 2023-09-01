import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Invest from "../../src/components/Invest";

const InvestPage: NextPage = () => {
  // const router = useRouter();
  // const user = useSelector((state: any) => state.auth.user);

  // if (user == null) {
  //   router.push("/");
  //   return <></>;
  // }
  // router.push("/");
  return (
    <>
      <Invest />
    </>
  );
};

export default InvestPage;
