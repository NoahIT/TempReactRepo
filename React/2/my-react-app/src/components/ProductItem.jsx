import React from 'react';

// Komponentas, atvaizduojantis vieną prekę
const ProductItem = ({ product, addToCart }) => {
  return (
    <li className="product-item">
      {/*Rodo prekės pavadinimą ir mygtuką pridėti į krepšelį*/}
      <span>{product.name}</span>
      <button onClick={() => addToCart(product)}>Pridėti į krepšelį</button>
    </li>
  );
};

export default ProductItem;
