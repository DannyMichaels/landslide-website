import styled from 'styled-components';
import { getAllSongs } from '../../services/songs.services';
import Head from 'next/head';
import SongCard from '../../components/SongCard/SongCard';

export default function Music({ allSongs }) {
  return (
    <>
      <Head>
        <title>Landslide | Music</title>
      </Head>
      <Wrapper>
        <div className="songs__grid">
          {allSongs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      </Wrapper>
    </>
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
