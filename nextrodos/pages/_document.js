import React from 'react';
import Document, {Html, Head, Main, NextScript } from 'next/document';
import { GA } from '../components/common';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="google" content="notranslate" />

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.10.7/antd.min.css" />
        </Head>
        <body className='bg-gray-300'>
          <Main />
          <NextScript />
          <GA />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
