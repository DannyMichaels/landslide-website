import dbConnect from '../../lib/dbConnect';
import Song from '../../models/Song';

// TODO
export default function OneSongPage() {
  return <div>one song</div>;
}
export async function getServerSideProps({ params }) {
  await dbConnect();

  const song = await Song.findById(params.id).lean();
  song._id = song._id.toString();

  return { props: { song } };
}
