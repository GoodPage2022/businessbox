import "../styles/main.scss";
import type { AppProps } from "next/app";
import BaseLayout from "../src/layouts/BaseLayout";

import store from '../store/store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

function MyApp({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
