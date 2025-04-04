import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  // Krepšelio būsena: saugome prekes, kurios buvo pridėtos
  const [cart, setCart] = useState([]);

  // Statiniai produkto duomenys, pavyzdiui
  const products = [
    { id: 1, name: 'Prekė 1' },
    { id: 2, name: 'Prekė 2' },
    { id: 3, name: 'Prekė 3' },
  ];

  // Funkcija prekei pridėti į krepšelį.
  // Jei prekė jau yra, didiname jos kiekį, priešingu atveju - pridedame naują.
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  //Funkcija prekei pašalinti iš krepšelio.
  //Jei kiekis > 1, mažiname kiekį. Jei kiekis = 1, pašaliname prekę iš krepšelio.
  const removeFromCart = (id) => {
    const existingProduct = cart.find((item) => item.id === id);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        const updatedCart = cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
      } else {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
      }
    }
  };

  return (
    <div className="App">
      <h1>Pirkinių Krepšelis</h1>
      <div className="container">
        {/*Komponentas, atsakingas už prekių sąrašą*/}
        <ProductList products={products} addToCart={addToCart} />
        {/*Krepšelio komponentas*/}
        <Cart cart={cart} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
}

export default App;
