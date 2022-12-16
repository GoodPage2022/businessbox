import "../styles/main.scss";
import BaseLayout from "../src/layouts/BaseLayout";
import Script from "next/script";

import store from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps, session }: any) {
  let persistor = persistStore(store);

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-3J60LWZ0W1"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
       
         gtag('config', 'G-3J60LWZ0W1');
        `}
      </Script>

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
