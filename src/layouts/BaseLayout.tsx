import React, { FC } from "react";
import Head from "next/head";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { MainContext } from "../contexts/mainContext";
import { reducer, initialState } from "../reducers/MainReducer";
interface Props {
  children: any;
}

const BaseLayout: FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      <Head>
        <title>Business-box</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <MainContext.Provider value={[state, dispatch]}>
        <Header />
        <main>{children}</main>
        <Footer />
      </MainContext.Provider>
    </>
  );
};

export default BaseLayout;
