import "../styles/main.scss";
import BaseLayout from "../src/layouts/BaseLayout";
import Script from "next/script";

import store from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

import * as fbq from "../lib/fpixel";
import { useEffect } from "react";

function MyApp({ Component, pageProps, session }: any) {
  let persistor = persistStore(store);
  const router = useRouter();

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview();

    const handleRouteChange = () => {
      fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* <title>Business Box</title> */}
        {/* <meta
          name="description"
          content="Business Box – перша унікальна платформа по купівлі, продажу бізнесу,  інвестуванню та пошуку інвестицій. Головною метою – є надання професійних послуг з питань купівлі, продажу, аналізу, навчанню, модернізації, інвестуванню та пошку інвестицій. Платформа заснована трьома підприємцями Дмитро Буряк, Олександр Найда та Віталій Лубінець та враховує різний досвід їх діючих бізнесів та бізнесіів та володарів бізнесу з якими вини близько дотичнв. Функціонал даного інструменту розрахований на легке та логічне використання платформи, як для досвідченого користувача, так і для новачка."
        /> */}
        {/* <meta property="og:title" content="Business Box" /> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.baseUrl}${router.asPath}`}
        />
        <meta property="og:image" content="/assets/images/BB-meta.png" />

        {/* <meta
          property="og:description"
          content="Business Box – перша унікальна платформа по купівлі, продажу бізнесу,  інвестуванню та пошуку інвестицій. Головною метою – є надання професійних послуг з питань купівлі, продажу, аналізу, навчанню, модернізації, інвестуванню та пошку інвестицій. Платформа заснована трьома підприємцями Дмитро Буряк, Олександр Найда та Віталій Лубінець та враховує різний досвід їх діючих бізнесів та бізнесіів та володарів бізнесу з якими вини близько дотичнв. Функціонал даного інструменту розрахований на легке та логічне використання платформи, як для досвідченого користувача, так і для новачка."
        /> */}

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

      <Script id="meta-pixel-code" strategy="afterInteractive">
        {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
            fbq('track', 'PageView');
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
