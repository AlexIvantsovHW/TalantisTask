import { store } from "@/app/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        {/* Add other meta tags or head elements as needed */}
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
