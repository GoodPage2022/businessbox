import type { NextPage } from "next";
import React from "react";

import AddBusiness from "../../src/components/Account/AddBusiness";
import AccountLayout from "../../src/layouts/AccountLayout";

const AddMyBusiness: NextPage = () => {
  return (
    <>
      <AccountLayout>
        <AddBusiness />
      </AccountLayout>
    </>
  );
};

export default AddMyBusiness;
