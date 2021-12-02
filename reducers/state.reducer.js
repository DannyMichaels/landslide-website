export default function stateReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_AUDIO_PLAYER': {
      return {
        ...state,
        audioPlayer: {
          ...state.audioPlayer,
          [payload.key]: payload.value,
        },
      };
    }

    case 'SET_SONG_PLAYING': {
      return {
        ...state,
        audioPlayer: {
          isPlaying: false,
          song: payload,
          trackProgress: 0,
        },
      };
    }
    default:
      return state;
  }
}
