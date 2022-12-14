import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import UsefulTools from "../../src/components/UsefulTools/UsefulTools";

const UsefulToolsPage: NextPage = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);

  if (user == null) {
    router.push("/");
    return <></>;
  }
  router.push("/");
  return <>{/* <UsefulTools /> */}</>;
};

export default UsefulToolsPage;
