import Head from 'next/head';
import styled from 'styled-components';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Hello</h1>
      </Container>
    </div>
  );
}

const Container = styled.div`
  h1 {
    color: red;
  }
`;
