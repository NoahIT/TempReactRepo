import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Inicializuojame būseną iš localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Simuliuojame prisijungimo API užklausą
  const signIn = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username && credentials.password) {
          const loggedInUser = { username: credentials.username };
          setUser(loggedInUser);
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          resolve(loggedInUser);
        } else {
          reject('Netinkami prisijungimo duomenys');
        }
      }, 1000);
    });
  };

  // Simuliuojame registracijos API užklausą
  const signUp = async (registrationData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (registrationData.username && registrationData.password) {
          resolve({ message: 'Registracija sėkminga' });
        } else {
          reject('Registracijos klaida');
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
