import type { NextPage } from "next";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import ContactInfo from "../../src/components/Account/ContactInfo";
import AccountLayout from "../../src/layouts/AccountLayout";

const Contact: NextPage = () => {
  const router = useRouter();
  // const user = useSelector((state: any) => state.auth.user);
  const userSelector = useSelector((state: any) => state.auth.user);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    setUser(userSelector);
  }, [userSelector]);

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      <AccountLayout>
        <ContactInfo />
      </AccountLayout>
    </>
  );
};

export default Contact;
