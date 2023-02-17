import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import AddBusinessFinish from "../../../src/components/Invest/AddBusiness/AddBusinessFinish";
import AccountLayout from "../../../src/layouts/AccountLayout";

const AddMyBusinessFinish: NextPage = () => {
  const router = useRouter();
  const { businessId } = router.query;
  const user = useSelector((state: any) => state.auth.user);

  // if (user == null) {
  //   router.push("/");
  //   return <></>;
  // }

  if (businessId == null) {
    // router.back()
    return <></>;
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
