import TState from '../types/_state';

interface Action {
  payload: any;
  type: string;
}

export default function stateReducer(state: TState, action: Action) {
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

    case 'CLOSE_AUDIO_PLAYER': {
      return {
        ...state,
        audioPlayer: {
          isPlaying: false,
          song: null,
        },
      };
    }

    case 'SET_SONG_PLAYING': {
      return {
        ...state,
        audioPlayer: {
          isPlaying: payload._id,
          song: payload,
        },
      };
    }

    default:
      return state;
  }
}
