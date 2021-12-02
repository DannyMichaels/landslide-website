import Head from 'next/head';
import styled from 'styled-components';
import Hero from '../components/Home/Hero';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Landslide</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
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
      </Head>
      <Container>
        <Hero />
      </Container>
    </div>
  );
}

const Container = styled.div``;
