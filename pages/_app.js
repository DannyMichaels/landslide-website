import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #000;
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
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
