import styled from 'styled-components';
import { getAllSongs } from '../../services/songs.services';
import Head from 'next/head';
import SongCard from '../../components/SongCard/SongCard';
import NavSpacer from '../../components/shared/Layout/NavSpacer';
import { GetServerSideProps } from 'next';
import TSong from './../../types/_Song';
import dbConnect from '../../lib/dbConnect';
import Song from '../../models/Song';

export default function Music({ allSongs }) {
  return (
    <>
      <Head>
        <title>Music | Landslide</title>
      </Head>
      <NavSpacer />
      <Wrapper>
        <div className="songs__grid">
          {allSongs.map((song: TSong) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      </Wrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const result = await Song.find({});

  const allSongs = result.map((doc) => {
    const song = doc.toObject();
    song._id = song._id.toString();
    return song;
  });

  return { props: { allSongs } };
};

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
`;
