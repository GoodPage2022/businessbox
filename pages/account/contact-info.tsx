import type { NextPage } from "next";

import { useSelector } from "react-redux";
import { useRouter } from 'next/router'
import React from "react";

import ContactInfo from "../../src/components/Account/ContactInfo";
import AccountLayout from "../../src/layouts/AccountLayout";

const Contact: NextPage = () => {
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.user);

  if (user == null) {
    router.push('/')
    return (<></>)
  }

  return (
    <>
      <AccountLayout>
        <ContactInfo />
      </AccountLayout>
    </>
  );
};

export default Contact;
