import React, { useEffect, useState } from 'react';

import { Product } from '../../shared/interfaces/Product.interface';
import httpClient from '../../shared/http-client/http-client';
import ProductCard from '../../components/ProductCard/ProductCard';

import "./styles.css";

function MyInterest() {
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await httpClient.get<Product[]>(
          'products/list/user-interest',
        );

        setMyProducts(response.data);
      } catch (err) {
        console.log('Erro ao carregar os produtos: ', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='products-container'>
      {myProducts.map((currentProduct) => {
        return (
          <ProductCard
            key={currentProduct.id}
            id={currentProduct.id}
            name={currentProduct.name}
            description={currentProduct.description}
          />
        );
      })}
    </div>
  );
}

export default MyInterest;
