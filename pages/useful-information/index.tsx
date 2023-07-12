import type { NextPage } from "next";
import React from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";

import UsefulTools from "../../src/components/UsefulTools/UsefulTools";
import Head from "next/head";

const UsefulToolsPage: NextPage = () => {
  // const router = useRouter();
  // const user = useSelector((state: any) => state.auth.user);

  // if (user == null) {
  //   if (typeof window !== "undefined") router.push("/");
  //   return <></>;
  // }

  return (
    <>
      <Head>
        <meta property="og:title" content="Чеклист" />
        <meta
          property="og:description"
          content="Як підготувати бізнес до продажу або залучення інвестицій"
        />
      </Head>
      <UsefulTools />;
    </>
  );
};

export default UsefulToolsPage;
