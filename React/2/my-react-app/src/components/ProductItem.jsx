import React from 'react';

const ProductItem = ({ product, addToCart }) => {
  return (
    <li className="product-item">
      <span>{product.name}</span>
      <button onClick={() => addToCart(product)}>Pridėti į krepšelį</button>
    </li>
  );
};

export default ProductItem;
