import { createContext, useContext, useReducer } from 'react';
import stateReducer from '../reducers/state.reducer';
import TState from './../types/_state';

const AppContext = createContext(null);

export function AppStateProvider({ children }) {
  const initialState: TState = {
    audioPlayer: {
      isPlaying: false,
      song: null,
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
