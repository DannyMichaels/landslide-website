import dbConnect from '../../lib/dbConnect';
import Song from '../../models/Song';

export default function Song() {
  return <div>one song</div>;
}
export async function getServerSideProps({ params }) {
  await dbConnect();

  const song = await Song.findById(params.id).lean();
  song._id = song._id.toString();

  return { props: { song } };
}
