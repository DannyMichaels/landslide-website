import { createContext, useContext, useReducer } from 'react';
import stateReducer from '../reducers/state.reducer';

const AppContext = createContext();

export function AppStateProvider({ children }) {
  const initialState = {
    audioPlayer: {
      isPlaying: false,
      song: null,
      trackProgress: 0,
    },
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
