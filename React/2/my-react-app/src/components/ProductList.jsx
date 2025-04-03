import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      <h2>Prekių sąrašas</h2>
      <ul>
        {products.map(product => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
