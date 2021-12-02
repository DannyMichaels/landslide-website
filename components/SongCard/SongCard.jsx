import styled from 'styled-components';

export default function SongCard({ song = null, onClick = () => {} }) {
  if (!song) {
    return new Error('Song not provided!, at SongCard.jsx');
  }

  return (
    <Container imgUrl={song.imgUrl} onClick={onClick}>
      <h2 className="song__title">{song.title}</h2>
    </Container>
  );
}

const Container = styled.div`
  align-self: center;
  /* width: 100%; */
  height: 250px;
  padding: 10px;

  background-image: ${({ imgUrl }) =>
    `url(${imgUrl}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: overlay;

  @media screen and (min-width: 501px) {
    width: 250px;
  }

  .song__title {
    font-size: 1.2rem;
    word-break: break-word;
    font-family: 'Open Sans', sans-serif;
    letter-spacing: 2px;
  }
`;
