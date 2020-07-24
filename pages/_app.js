import React from "react";
import App from "next/app";
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

  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
