import { createGlobalStyle, ThemeProvider } from 'styled-components';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import Layout from '../components/shared/Layout/Layout';
import { AppStateProvider } from './../context/state';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #000;
    color: #fff;
    height: 100vh;
  }
`;

const theme = {
  colors: {
    primary: '#fff',
    secondary: '#000',
  },
};

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,300&family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppStateProvider>
        <GlobalStyle />

        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>

          <AudioPlayer />
        </ThemeProvider>
      </AppStateProvider>
    </>
  );
}

export default App;
