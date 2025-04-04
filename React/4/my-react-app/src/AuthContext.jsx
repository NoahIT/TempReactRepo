import React, { createContext, useState, useEffect } from 'react';

// Sukuriame AuthContext, kuris bus naudojamas norint perduoti autentifikacijos duomenis visoje aplikacijoje
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Būsena vartotojo duomenims saugoti - pradžioje nustatoma į null

  // Naudojame useEffect, kad inicijuotume būseną pagal tai, kas yra išsaugota localStorage - prisijungusio vartotojo duomenys
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Bandome gauti vartotojo duomenis iš localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Jei duomenys yra, nustatome vartotoją
    }
  }, []); // Šis useEffect bus vykdomas tik pirmą kartą užkraunant komponentą

  // Simuliuojame prisijungimo API užklausą
  const signIn = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simuliuojame uždelsimą 1 sek.
        if (credentials.username && credentials.password) { // Tikriname ar pateikti duomenys yra teisingi
          const loggedInUser = { username: credentials.username }; // Jei teisinga, sukuriame prisijungusio vartotojo objektą
          setUser(loggedInUser); // Išsaugome vartotojo duomenis būsenoje
          localStorage.setItem('user', JSON.stringify(loggedInUser)); // Išsaugome vartotojo duomenis localStorage
          resolve(loggedInUser); // Grąžiname vartotojo duomenis kaip atsakymą
        } else {
          reject('Netinkami prisijungimo duomenys'); // Jei prisijungimo duomenys klaidingi, atmetame užklausą
        }
      }, 1000); // 1 sek. vėlavimas, kad atrodytų kaip tikra API užklausa
    });
  };

  // Simuliuojame registracijos API užklausą
  const signUp = async (registrationData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simuliuojame uždelsimą (1 sek.)
        if (registrationData.username && registrationData.password) { // Tikriname, ar duomenys yra teisingi
          resolve({ message: 'Registracija sėkminga' }); // Jei viskas gerai, grąžiname sėkmingą atsakymą
        } else {
          reject('Registracijos klaida'); // Jei kažkas ne taip, atmetame užklausą
        }
      }, 1000); // 1 sek. vėlavimas
    });
  };

  // Funkcija atsijungimui (išvalo vartotojo būseną ir pašalina duomenis iš localStorage)
  const logout = () => {
    setUser(null); // Pašaliname vartotoją iš būsenos
    localStorage.removeItem('user'); // Pašaliname vartotojo duomenis iš localStorage
  };

  return (
    // AuthContext.Provider suteikia šiuos duomenis visiems komponentams, kurie naudoja AuthContext
    <AuthContext.Provider
      value={{ 
        user, // Vartotojo duomenys
        signIn, // Funkcija prisijungimui
        signUp, // Funkcija registracijai
        logout, // Funkcija atsijungimui
        isAuthenticated: !!user // Boolean reikšmė, nurodanti, ar vartotojas yra prisijungęs
      }}
    >
      {children} {/* Perduodame visus vaikus (komponentus), kurie bus pasiekiami per AuthContext */}
    </AuthContext.Provider>
  );
};