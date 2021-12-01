import dbConnect from '../../lib/dbConnect';
import Song from '../../models/Song';
import styled from 'styled-components';

export default function Music({ allSongs }) {
  return (
    <Wrapper>
      <div className="items">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 98%;
  max-width: 1100px;
  margin: 20px auto;
  padding: 40px;

  .items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    align-items: center;
    justify-content: center;
    gap: 20px;

    div {
      align-self: center;
      background: red;
      height: 250px;
      width: 250px;
    }
  }
`;

export async function getServerSideProps() {
  await dbConnect();

  const result = await Song.find({});

  const songs = result.map((doc) => {
    const song = doc.toObject();
    song._id = song._id.toString();
  });

  return { props: { allSongs: songs } };
}
