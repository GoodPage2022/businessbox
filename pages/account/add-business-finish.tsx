import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router'

import AddBusinessFinish from "../../src/components/Account/AddBusinessFinish";
import AccountLayout from "../../src/layouts/AccountLayout";

const AddMyBusinessFinish: NextPage = () => {
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.user);

  if (user == null) {
    router.push('/')
    return (<></>)
  }

  return (
    <>
      <AccountLayout>
        <AddBusinessFinish />
      </AccountLayout>
    </>
  );
};

export default AddMyBusinessFinish;
