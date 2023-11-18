
import React from 'react';

const  ListaProdutos = () => {
  // Define an array of fixed products
  const products = [
    {
      name: 'Product 1',
      price: 10.99,
      description: 'This is the description of Product 1',
    },
    {
      name: 'Product 2',
      price: 19.99,
      description: 'This is the description of Product 2',
    },
    {
      name: 'Product 3',
      price: 7.99,
      description: 'This is the description of Product 3',
    },
    // Add more products as needed
  ];

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProdutos;
