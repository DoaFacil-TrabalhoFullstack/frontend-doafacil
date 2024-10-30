import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext<AuthProviderContext | undefined>(undefined);

interface AuthProviderContext {
  user?: Record<string, unknown>;
  token?: string;
  login: (userData: Record<string, unknown>, authToken: string) => void;
  logout: () => void;
}

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<Record<string, unknown> | undefined>();
  const [token, setToken] = useState<string | undefined>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = (userData: Record<string, unknown>, authToken: string) => {
    console.log("login")
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const logout = () => {
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Não foi possível buscar o authContext");
  }
  return context;
};
