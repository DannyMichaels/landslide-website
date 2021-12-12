import Head from 'next/head';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('../components/Home/Hero'));

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Landslide</title>
      </Head>
      <Container>
        <Hero />
      </Container>
    </div>
  );
}

const Container = styled.div``;
