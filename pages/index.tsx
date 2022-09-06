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

  //   const us = {"user":{"name":"API User Test","user":"veryadmin","password":"sef90we!sd0","email":"growler625@gmail.com","api_key":1}}

  //   const { data } = await axios.post(`${process.env.cockpitApiUrl}/cockpit/saveUser?token=${process.env.cockpitApiToken}`, us)

