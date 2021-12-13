import styled from 'styled-components';
import Image from 'next/image';
import ScrollForMore from '../buttons/ScrollForMore';

export default function Hero() {
  return (
    <>
      <Container>
        <div className="overlay">
          <h1>Landslide</h1>
        </div>
        <Image
          sizes="100%"
          quality={100}
          className="img"
          src="/assets/hero.jpg"
          layout="fill"
          blurDataURL="/assets/hero.jpg"
          placeholder="blur"
          objectFit="contain"
          objectPosition="center"
          alt="The band"
        />
        <div className="hero__scroll-for-more">
          <ScrollForMore />
        </div>
        <div className="hero--fadeBottom" />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  max-height: 80vh;

  @media screen and (min-width: 1100px) {
    min-height: 40vh;
  }

  position: relative;
  margin: 0 auto;
  width: 100%;

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
      font-family: 'Montserrat', sans-serif;
      text-transform: uppercase;
    }
  }

  & > span {
    position: unset !important;
    height: 100%;
    padding-bottom: 50%;
  }

  .img {
    transition: all 250ms ease-in-out;
    z-index: -1;
    background-color: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));

    position: relative !important;
    height: unset !important;

    width: 100% !important;
    max-height: 80vh !important;
    object-fit: contain;

    @media screen and (min-width: 768px) {
      object-fit: cover !important;
    }

    opacity: 0.8;
  }

  .hero__scroll-for-more {
    position: absolute;
    bottom: 20px;
    left: 50px;

    display: none;

    @media (min-width: 1000px) {
      display: block;
    }
  }

  .hero--fadeBottom {
    height: 2.4rem;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`;
