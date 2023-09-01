import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import AccountLayout from "../../../src/layouts/AccountLayout";
import AddBusinessEdit from "../../../src/components/Account/AddBusinessEdit";

const EditBusiness: NextPage = () => {
  const router = useRouter();
  const { businessId } = router.query;
  const userSelector = useSelector((state: any) => state.auth.user);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(userSelector);
  }, [userSelector]);

  useEffect(() => {
    if (user == null) {
      router.push("/");
      // return <></>;
    }
  }, [user, router]);

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
        <AddBusinessEdit projectId={businessId} />
      </AccountLayout>
    </>
  );
};

export default EditBusiness;
