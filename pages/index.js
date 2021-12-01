import Head from 'next/head';
import styled from 'styled-components';
import Hero from '../components/Home/Hero';
import Header from '../components/shared/Layout/Header';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,300&family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Container>
        <Hero />
      </Container>
    </div>
  );
}

const Container = styled.div``;
