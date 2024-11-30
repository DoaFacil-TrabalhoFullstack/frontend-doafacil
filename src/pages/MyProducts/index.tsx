import React, { useEffect, useState } from 'react';

import httpClient from '../../shared/http-client/http-client';
import { Product } from '../../shared/interfaces/Product.interface';

function MyProducts() {
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await httpClient.get<Product[]>(
          '/products/list/:ownerId',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setMyProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  console.log(myProducts);

  return (
    <div>
      <h1>My Products</h1>
    </div>
  );
}

export default MyProducts;
