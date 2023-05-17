import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router'

import AddBusiness from "../../src/components/Account/AddBusiness";
import AccountLayout from "../../src/layouts/AccountLayout";

const AddMyBusiness: NextPage = () => {
  const router = useRouter()

  const [user, setUser] = React.useState<any>(null);
  const userUseSelector = useSelector((state: any) => state.auth.user);
  React.useEffect(()=>{
    if (userUseSelector == null && typeof window !== "undefined")
    router.push('/')

    setUser(userUseSelector)
  },[userUseSelector])

  if (user == null) {
    return (<></>)
  }

  return (
    <>
      <AccountLayout>
        <AddBusiness />
      </AccountLayout>
    </>
  );
};

export default AddMyBusiness;
