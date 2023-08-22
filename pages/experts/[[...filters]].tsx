import type { NextPage } from "next";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";
import React from "react";
import CatalogView from "../../src/components/Experts/CatalogView";

const Catalog: NextPage = () => {
  // const router = useRouter();
  // const user = useSelector((state: any) => state.auth.user);

  // if (user == null) {
  //   router.push("/");
  //   return <></>;
  // }

  return (
    <>
      <CatalogView />
    </>
  );
};

export default Catalog;
