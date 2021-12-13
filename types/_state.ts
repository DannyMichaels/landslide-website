import TAudioPlayer from './_AudioPlayer';
import TSong from './_Song';

export default interface TState {
  audioPlayer: TAudioPlayer;
  allSongs: TSong[];
  songsLoading: boolean;
}
