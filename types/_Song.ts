import TAlbum from './_Album';

export default interface TSong {
  title: string;
  audioSrc: string;
  imgUrl: string;
  description?: string;
  recordLabel?: string;
  _album: TAlbum;
  artist: string;
  bpm: number;
  _id: string;
}
