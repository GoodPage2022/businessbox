import "../styles/main.scss";
import type { AppProps } from "next/app";
import BaseLayout from "../src/layouts/BaseLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </>
  );
}

export default MyApp;
