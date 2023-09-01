import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import AddBusinessFinish from "../../src/components/Account/AddBusinessFinish";
import AccountLayout from "../../src/layouts/AccountLayout";

const AddMyBusinessFinish: NextPage = () => {
  const router = useRouter();
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

  // if (user == null) {
  //   if (typeof window !== "undefined") router.push("/");
  //   return <></>;
  // }

  return (
    <>
      <AccountLayout>
        <AddBusinessFinish />
      </AccountLayout>
    </>
  );
};

export default AddMyBusinessFinish;
