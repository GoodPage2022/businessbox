import type { NextPage } from "next";

import { useSelector } from "react-redux";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";

import ContactInfo from "../../src/components/Account/ContactInfo";
import AccountLayout from "../../src/layouts/AccountLayout";

const Contact: NextPage = () => {
  const router = useRouter()
  const user = useSelector((state: any) => state.auth.user);
  // const userSelector = useSelector((state: any) => state.auth.user);
  // const [user, setUser] = useState(null)

  // useEffect(()=>{
  //   setUser(userSelector)
  // },[userSelector])

  if (user == null) {
    if (typeof window !== "undefined")
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
