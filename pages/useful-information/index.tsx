import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import UsefulTools from "../../src/components/UsefulTools/UsefulTools";

const UsefulToolsPage: NextPage = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  console.log(user, "user");

  if (user == null) {
    if (typeof window !== "undefined") router.push("/");
    return <></>;
  }

  return <>{<UsefulTools />}</>;
};

export default UsefulToolsPage;
