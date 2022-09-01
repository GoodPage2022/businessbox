import type { NextPage } from "next";

import React from "react";

import ContactInfo from "../../src/components/Account/ContactInfo";
import AccountLayout from "../../src/layouts/AccountLayout";

const Contact: NextPage = () => {
  return (
    <>
      <AccountLayout>
        <ContactInfo />
      </AccountLayout>
    </>
  );
};

export default Contact;
