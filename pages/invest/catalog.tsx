import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CatalogView from "../../src/components/Invest/Catalog/CatalogView";

const CatalogInvestPage: NextPage = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);

  return (
    <>
      <CatalogView />
    </>
  );
};

export default CatalogInvestPage;
