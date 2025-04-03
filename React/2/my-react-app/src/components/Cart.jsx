import React from 'react';

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
                {item.name} (Kiekis: {item.quantity})
              </span>
              <button onClick={() => removeFromCart(item.id)}>Pašalinti iš krepšelio</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
