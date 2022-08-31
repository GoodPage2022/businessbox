import Head from "next/head";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import React, { FC } from "react";

interface Props {
  children: any;
}

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Business-box</title>
        <link rel="shortcut icon" href="/assets/svg/favicon.svg" />
        <link
          rel="shortcut icon"
          href="/assets/images/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default BaseLayout;
