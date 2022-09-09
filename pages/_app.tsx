import "../styles/main.scss";
import type { AppProps } from "next/app";
import BaseLayout from "../src/layouts/BaseLayout";

import store from '../store/store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps, session }: any) {
  let persistor = persistStore(store);

  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
