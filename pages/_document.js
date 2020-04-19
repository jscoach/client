import React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
} from 'next/document';


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return {...initialProps};
  }

  render() {
    return (
      <html lang="en" className="bg-white antialiased">
      <Head>
        <meta charSet="utf-8"/>
        <meta name="referrer" content="origin-when-cross-origin"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link href="https://fonts.googleapis.com/css?family=Karla:400,700" rel="stylesheet"/>
          <link rel="shortcut icon" href="/favicon.ico"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="theme-color" content="#fec93e"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="#181f2c"/>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-71724704-1"/>
      </Head>
      <body className="overflow-x-hidden">
      <Main/>
      <NextScript/>
      </body>
      </html>
  );
  }
  }
