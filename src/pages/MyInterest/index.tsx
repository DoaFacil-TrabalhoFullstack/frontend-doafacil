import React, { useEffect, useState } from 'react';

import { Product } from '../../shared/interfaces/Product.interface';
import httpClient from '../../shared/http-client/http-client';

function MyInterest() {
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await httpClient.get<Product[]>(
          'products/list/ownerId',
          {
            params: {
              ownerId: 5, //setar o id do user logado
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setMyProducts(response.data);
      } catch (err) {
        console.log('Erro ao carregar os produtos: ', err);
      }
    };

    fetchProducts();
  }, []);

  return <h1>My Products</h1>;
}

export default MyInterest;
