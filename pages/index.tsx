import type { NextPage } from "next";
import Categories from "../src/components/HomePage/Categories/Categories";
import Popular from "../src/components/HomePage/Popular/Popular";
import RegisterBusiness from "../src/components/HomePage/RegisterBusiness/RegisterBusiness";

const IndexPage: NextPage = () => {
  return (
    <>
      <Categories />
      <Popular />
      <RegisterBusiness />
    </>
  );
};

export default IndexPage;
