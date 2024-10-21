import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any; // Replace `any` with a more specific user type
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
type User = {
  name: string;
  email: string;
  password: string;
  username: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    // update user from local storage
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      setUser(storedUser);
    }

    // update auth token from local storage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  const signup = async (
    name: string,
    email: string,
    username: string,
    password: string
  ) => {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, username, password }),
    });

    if (response.ok) {
      const { user, token } = await response.json();
      setUser(user);
      setAuthToken(token);
      // save this data to local storage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', token);
    } else {
      throw new Error('Signup failed');
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { user, token } = await response.json();
      setUser(user);
      setAuthToken(token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', token);
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
