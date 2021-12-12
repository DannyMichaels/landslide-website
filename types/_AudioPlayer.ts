import TSong from './_Song';

export default interface TAudioPlayer {
  isPlaying: boolean;
  song: TSong;
}
