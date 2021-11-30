import styled from 'styled-components';
import Image from 'next/image';
import ScrollForMore from '../buttons/ScrollForMore';

export default function Hero() {
  return (
    <Container>
      <div className="overlay">
        <h1>Landslide</h1>
        {/* <p>Subtitle</p> */}
      </div>

      <Image
        priority
        src="/assets/hero.jpg"
        alt="Picture of the band"
        layout="responsive"
        height={1080}
        className="hero__image"
        width={1920}
        blurDataURL="/assets/hero.jpg"
        placeholder="blur"
      />

      <div className="hero__view-more">
        <ScrollForMore />
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;

  .overlay {
    text-align: center;
    position: absolute;
    z-index: 0;
    width: 100%;
    h1 {
      font-size: 6vw;
      transform: translateY(9vw);
      color: #fff;
      letter-spacing: 0.45rem;
      font-weight: 700;
    }
  }

  .hero__view-more {
    position: absolute;
    bottom: 50px;
    left: 50px;

    display: none;

    @media (min-width: 1000px) {
      display: block;
    }
  }

  .hero__image {
    position: relative;
    display: block;
    overflow: visible;
    z-index: -1;
    margin-left: auto;
    margin-right: auto;
    width: 75%;
  }
`;
