import type { NextPage } from "next";
import Categories from "../src/components/HomePage/Categories/Categories";
import Popular from "../src/components/HomePage/Popular/Popular";
import RegisterBusiness from "../src/components/HomePage/RegisterBusiness/RegisterBusiness";
// import { useDispatch, useSelector } from "react-redux";
// import { onSignIn } from '../store/actions/auth';
// import { Dispatch, AnyAction } from 'redux';

const IndexPage = () => {
  // const token = useSelector((state: any) => state.auth.token)
  // const dispatch = useDispatch()
  // dispatch(onSignIn("tokenSETTEDd"))
  // console.log("token")
  // console.log(token)
  



  // const ter = async () => {
    
  //   // const data = {
  //   //   user: "sdfsdf@sdf.df",
  //   //   password: "secret"
  //   // }
  
  //   // try {
  //   //   const newBusinessResponse = await axios.post(`${process.env.cockpitApiUrl}/cockpit/authUser?token=${process.env.cockpitApiToken}`, data)
  //   //   console.log("newUserResponse");
  //   //   console.log(newBusinessResponse);
  //   // } catch (err: any) {
  //   //   console.log("newUserResponse3");
  //   //   console.log(err);
  //   // }
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
