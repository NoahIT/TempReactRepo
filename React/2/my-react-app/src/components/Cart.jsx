import React from 'react';

// Komponentas, atsakingas už pirkinių krepšelio rodymą
const Cart = ({ cart, removeFromCart }) => {
  return (
    <div className="cart">
      <h2>Jūsų krepšelis</h2>
      {cart.length === 0 ? (
        <p>Krepšelis tuščias</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id} className="cart-item">
              <span>
                {/*Rodo prekės pavadinimą ir kiekį*/}
                {item.name} (Kiekis: {item.quantity})
              </span>
              {/*Mygtukas prekei pašalinti iš krepšelio*/}
              <button onClick={() => removeFromCart(item.id)}>Pašalinti iš krepšelio</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
