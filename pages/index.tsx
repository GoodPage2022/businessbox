import type { NextPage } from "next";
import Categories from "../src/components/HomePage/Categories/Categories";
import Popular from "../src/components/HomePage/Popular/Popular";
import RegisterBusiness from "../src/components/HomePage/RegisterBusiness/RegisterBusiness";
import axios from "axios";

const IndexPage: NextPage = () => {

  // const ter = async () => {
  //   const data = {
  //     user: "sdfsdf@sdf.df",
  //     password: "secret"
  //   }
  
  //   try {
  //     const newBusinessResponse = await axios.post(`${process.env.cockpitApiUrl}/cockpit/authUser?token=${process.env.cockpitApiToken}`, data)
  //     console.log("newUserResponse");
  //     console.log(newBusinessResponse);
  //   } catch (err: any) {
  //     console.log("newUserResponse3");
  //     console.log(err);
  //   }
  // }

  // ter()

  return (
    <>
      <Categories />
      <Popular />
      <RegisterBusiness />
    </>
  );
};

export default IndexPage;

