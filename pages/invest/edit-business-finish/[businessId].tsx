import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import AccountLayout from "../../../src/layouts/AccountLayout";
import AddBusinessFinishEdit from "../../../src/components/Invest/AddBusiness/AddBusinessFinishEdit";

const EditBusinessFinish: NextPage = () => {
  const router = useRouter();
  const { businessId } = router.query;
  const user = useSelector((state: any) => state.auth.user);

  if (user == null) {
    if (typeof window !== "undefined")
      router.push("/");
    return <></>;
  }

  if (businessId == null) {
    // router.back()
    return <></>;
  }

  if (typeof businessId != "string") {
    return <></>;
  }

  return (
    <>
      <AccountLayout>
        <AddBusinessFinishEdit projectId={businessId} />
      </AccountLayout>
    </>
  );
};

export default EditBusinessFinish;
