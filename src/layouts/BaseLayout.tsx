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
      <MainContext.Provider value={[state, dispatch]}>
        <Header />
        <main>{children}</main>
        <Footer />
      </MainContext.Provider>
    </>
  );
};

export default BaseLayout;
