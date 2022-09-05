import type { NextPage } from "next";
import Categories from "../src/components/HomePage/Categories/Categories";
import Popular from "../src/components/HomePage/Popular/Popular";
import RegisterBusiness from "../src/components/HomePage/RegisterBusiness/RegisterBusiness";
import axios from 'axios'

const IndexPage: NextPage = () => {
  

  // const getData = async () => {
  //   console.log("process.env")
  //   console.log(process.env.cockpitApiUrl)

  //   const { data } = await axios.get(`${process.env.cockpitApiUrl}/collections/get/Businesses?token=${process.env.cockpitApiToken}`)

  //   console.log("data");
  //   console.log(data);
    
  //   return data
  // }

  // getData();

  return (
    <>
      <Categories />
      <Popular />
      <RegisterBusiness />
    </>
  );
};

export default IndexPage;
