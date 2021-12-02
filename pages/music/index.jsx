import styled from 'styled-components';
import { useAppContext } from '../../context/state';
import { getAllSongs } from '../../services/songs.services';

export default function Music({ allSongs }) {
  const { dispatch } = useAppContext();

  return (
    <Wrapper>
      <div className="songs__grid">
        {allSongs.map((song, key) => (
          <SongContent
            key={key}
            imgUrl={song.imgUrl}
            onClick={() =>
              dispatch({
                type: 'SET_SONG_PLAYING',
                payload: song,
              })
            }>
            <h2 className="song__title">{song.title}</h2>
          </SongContent>
        ))}
      </div>
    </Wrapper>
  );
}

export async function getServerSideProps() {
  const allSongs = await getAllSongs();

  return { props: { allSongs } };
}

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 20px auto;
  padding: 15px;

  .songs__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    align-items: center;
    justify-content: center;
    gap: 20px;

    @media screen and (min-width: 501px) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      padding: 40px;
    }
  }
`;

const SongContent = styled.div`
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
