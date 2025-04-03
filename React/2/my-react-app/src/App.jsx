import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  // Statiniai produkto duomenys
  const products = [
    { id: 1, name: 'Prekė 1' },
    { id: 2, name: 'Prekė 2' },
    { id: 3, name: 'Prekė 3' },
  ];

  // Add product to cart. If it exists, increase quantity.
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

  // Remove product: if quantity > 1, decrement; else remove it.
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
        <ProductList products={products} addToCart={addToCart} />
        <Cart cart={cart} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
}

export default App;
