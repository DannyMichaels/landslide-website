import TAlbum from './_Album';

export default interface TSong {
  title: string;
  imgUrl: string;
  description?: string;
  recordLabel?: string;
  _album: TAlbum;
  artist: string;
  bpm: number;
}
