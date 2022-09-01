import type { NextPage } from "next";
import React from "react";

import AddBusinessFinish from "../../src/components/Account/AddBusinessFinish";
import AccountLayout from "../../src/layouts/AccountLayout";

const AddMyBusinessFinish: NextPage = () => {
  return (
    <>
      <AccountLayout>
        <AddBusinessFinish />
      </AccountLayout>
    </>
  );
};

export default AddMyBusinessFinish;
