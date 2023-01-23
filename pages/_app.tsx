import "../styles/main.scss";
import BaseLayout from "../src/layouts/BaseLayout";
import Script from "next/script";

import store from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps, session }: any) {
  let persistor = persistStore(store);

  return (
    <>
      <Head>
        <title>Business Box</title>
        <meta
          name="description"
          content="Business Box – перша унікальна платформа по купівлі, продажу бізнесу,  інвестуванню та пошуку інвестицій. Головною метою – є надання професійних послуг з питань купівлі, продажу, аналізу, навчанню, модернізації, інвестуванню та пошку інвестицій. Платформа заснована трьома підприємцями Дмитро Буряк, Олександр Найда та Віталій Лубінець та враховує різний досвід їх діючих бізнесів та бізнесіів та володарів бізнесу з якими вини близько дотичнв. Функціонал даного інструменту розрахований на легке та логічне використання платформи, як для досвідченого користувача, так і для новачка."
        />
        <meta property="og:title" content="Business Box" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.baseUrl}`} />
        <meta
          property="og:image"
          content="https://static.olx.ua/static/olxua/naspersclassifieds-regional/olxeu-atlas-web-olxua/static/img/fb/fb-image_redesign.png?t=23-01-23"
        />

        <meta
          property="og:description"
          content="Business Box – перша унікальна платформа по купівлі, продажу бізнесу,  інвестуванню та пошуку інвестицій. Головною метою – є надання професійних послуг з питань купівлі, продажу, аналізу, навчанню, модернізації, інвестуванню та пошку інвестицій. Платформа заснована трьома підприємцями Дмитро Буряк, Олександр Найда та Віталій Лубінець та враховує різний досвід їх діючих бізнесів та бізнесіів та володарів бізнесу з якими вини близько дотичнв. Функціонал даного інструменту розрахований на легке та логічне використання платформи, як для досвідченого користувача, так і для новачка."
        />

        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
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
