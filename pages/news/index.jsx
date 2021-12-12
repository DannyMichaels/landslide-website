import dbConnect from '../../lib/dbConnect';
import Post from '../../models/Post';

// TODO
export default function Posts({ allPosts }) {
  return <>{JSON.stringify(allPosts)}</>;
}

/* Retrieves post(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Post.find({});

  const allPosts = result.map((doc) => {
    const post = doc.toObject();
    post._id = post._id.toString();
    return post;
  });

  return { props: { allPosts } };
}
