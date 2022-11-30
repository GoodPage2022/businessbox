import type { NextPage } from "next";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";
import React from "react";
import CatalogViewSearch from "../../src/components/Catalog/Catalog/CatalogViewSearch";

const Catalog: NextPage = () => {
  return (
    <>
      <CatalogViewSearch />
    </>
  );
};

export default Catalog;
