import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  token: JSON.parse(localStorage.getItem('token')) || null,
  name: JSON.parse(localStorage.getItem('name')) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(state.token));
    localStorage.setItem('name', JSON.stringify(state.name));
  }, [state.token, state.name]);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        name: state.name,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
