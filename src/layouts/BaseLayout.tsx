import React, { FC, useEffect } from "react";
import Head from "next/head";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { MainContext } from "../contexts/mainContext";
import { reducer, initialState } from "../reducers/MainReducer";

import { setCurrency as setCurrencyReducer } from "../../store/actions/currency";
import { useDispatch } from "react-redux";
import axios from "axios";

interface Props {
  children: any;
}

const BaseLayout: FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const dispatchRedux = useDispatch();

  useEffect(() => {
    getCurrencyRate();
  }, []);

  const getCurrencyRate = async () => {
    const { data: rateUSD, status: rateUSDStus } = await axios.get(
      `/api/currency/get`,
    );

    if (rateUSDStus == 200) {
      dispatchRedux(
        setCurrencyReducer({
          value: rateUSD,
          timestamp: Date.now(),
        }),
      );
    }
  };

  return (
    <>
      <Head>
        <title></title>
        {/* <meta
          name="description"
          content="Business Box – перша унікальна платформа по купівлі, продажу бізнесу,  інвестуванню та пошуку інвестицій. Головною метою – є надання професійних послуг з питань купівлі, продажу, аналізу, навчанню, модернізації, інвестуванню та пошку інвестицій. Платформа заснована трьома підприємцями Дмитро Буряк, Олександр Найда та Віталій Лубінець та враховує різний досвід їх діючих бізнесів та бізнесіів та володарів бізнесу з якими вини близько дотичнв. Функціонал даного інструменту розрахований на легке та логічне використання платформи, як для досвідченого користувача, так і для новачка."
        /> */}
        <meta
          property="og:title"
          content="Business Box – перша унікальна платформа по купівлі, продажу бізнесу,  інвестуванню та пошуку інвестицій. Головною метою – є надання професійних послуг з питань купівлі, продажу, аналізу, навчанню, модернізації, інвестуванню та пошку інвестицій. Платформа заснована трьома підприємцями Дмитро Буряк, Олександр Найда та Віталій Лубінець та враховує різний досвід їх діючих бізнесів та бізнесіів та володарів бізнесу з якими вини близько дотичнв. Функціонал даного інструменту розрахований на легке та логічне використання платформи, як для досвідченого користувача, так і для новачка."
        />
        <meta property="og:site_name" content="Business-box" />

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
