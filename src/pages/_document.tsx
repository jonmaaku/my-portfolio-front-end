import { GlobalStyles, InitColorSchemeScript } from '@mui/material';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <body style={{ margin: 0, overflowX: 'hidden' }}>
        <InitColorSchemeScript attribute="class" />

        <Main />
        <NextScript></NextScript>
      </body>
    </Html>
  );
}
