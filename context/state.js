import { createContext, useContext, useReducer, useEffect } from 'react';
import stateReducer from '../reducers/state.reducer';

const AppContext = createContext();

export function AppStateProvider({ children }) {
  const initialState = {
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
