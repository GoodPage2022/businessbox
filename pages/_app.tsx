import '../styles/main.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <>
      <Head>
        <title>
          Business-box
        </title>
        <link rel="shortcut icon" href='/assets/svg/favicon.svg' />
        <link
          rel="shortcut icon"
          href="/assets/images/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <Header />
       <main >
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}

export default MyApp
