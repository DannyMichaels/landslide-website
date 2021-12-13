import styled from 'styled-components';
import Head from 'next/head';
import SongCard from '../../components/SongCard/SongCard';
import NavSpacer from '../../components/shared/Layout/NavSpacer';
import type TSong from '../../types/_Song';
import { useAppContext } from '../../context/state';
import Loading from '../../components/shared/Loading/Loading';

export default function Music() {
  const { allSongs, songsLoading } = useAppContext();

  const songsJSX = songsLoading ? (
    <div className="songs__loading">
      <Loading withText />
    </div>
  ) : (
    allSongs.map((song: TSong) => <SongCard key={song._id} song={song} />)
  );

  return (
    <>
      <Head>
        <title>Music | Landslide</title>
      </Head>
      <NavSpacer />
      <Wrapper>
        <div className="songs__grid">{songsJSX}</div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;

  .songs__grid {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    align-items: center;
    justify-content: center;
    gap: 20px;
    overflow-y: auto;

    @media screen and (min-width: 651px) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      padding: 40px;
      max-height: 100vh;
    }
  }

  .songs__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 2rem;
      letter-spacing: 0.5rem;
      font-family: 'Montserrat', sans-serif;

      margin-bottom: 10px;
    }
  }
`;
