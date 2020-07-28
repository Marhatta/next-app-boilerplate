import React, { useEffect } from "react";
import App from "next/app";
/**import bootstrap css globally */
import "bootstrap/dist/css/bootstrap.min.css";
import { wrapper } from "../redux/store";

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    //You can dispatch from here using ctx.store.dispatch()
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        pathname: ctx.pathname,
      },
    };
  };

  componentDidMount() {
    /**Registering service worker */
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((reg) => {
          console.log("sw is ready!");
        })
        .catch((err) => {
          console.log("sw is not ready");
        });
    } else {
      console.log("Service worker not supported");
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
