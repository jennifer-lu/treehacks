import { createContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: (email: string, password: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});

export default AuthContext;
