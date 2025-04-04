import React from 'react';
import ProductItem from './ProductItem';

// Komponentas, atsakingas už prekių sąrašo rodymą
const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      <h2>Prekių sąrašas</h2>
      {/*Sąrašas, kuriame atvaizduojamos visos prekės*/}
      <ul>
        {products.map(product => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
