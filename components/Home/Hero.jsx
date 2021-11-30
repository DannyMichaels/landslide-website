import styled from 'styled-components';
import Image from 'next/image';
import ScrollForMore from '../buttons/ScrollForMore';

export default function Hero() {
  return (
    <HeroImage>
      <div className="overlay">
        <h1>Landslide</h1>
        {/* <p>And I'm a Photographer</p> */}
      </div>

      <Image
        priority
        src="/assets/hero.jpg"
        alt="Picture of the band"
        layout="responsive"
        height={1080}
        className="hero__image"
        width={1920}
      />

      <div className="hero__view-more">
        <ScrollForMore />
      </div>
    </HeroImage>
  );
}

const HeroImage = styled.div`
  /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/assets/hero.jpg'); */

  /* Set a specific height */
  /* height: 89vh; */

  /* Position and center the image to scale nicely on all screens */
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative; */

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
  /* Place text in the middle of the image */
  /* .hero__text {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  } */

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
