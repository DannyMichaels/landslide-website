import TSong from './_Song';

export default interface TAlbum {
  title: string;
  imgUrl: string;
  description: string;
  recordLabel?: string;
  songs: TSong[];
  atrist: string;
  _id: string;
}
