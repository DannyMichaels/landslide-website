import { createGlobalStyle, ThemeProvider } from 'styled-components';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import Layout from '../components/shared/Layout/Layout';
import { AppStateProvider } from './../context/state';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #000;
    color: #fff;
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
    <AppStateProvider>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>

        <AudioPlayer />
      </ThemeProvider>
    </AppStateProvider>
  );
}

export default App;
