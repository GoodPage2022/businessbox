import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import AddBusiness from "../../src/components/Invest/AddBusiness/AddBusiness";
import AccountLayout from "../../src/layouts/AccountLayout";

const AddMyBusiness: NextPage = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);

  // if (user == null) {
  //   router.push('/')
  //   return (<></>)
  // }

  return (
    <>
      <AccountLayout>
        <AddBusiness />
      </AccountLayout>
    </>
  );
};

export default AddMyBusiness;
