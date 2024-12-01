import React, { useEffect, useState } from 'react';

import httpClient from '../../shared/http-client/http-client';
import { Product } from '../../shared/interfaces/Product.interface';
import ProductCard from '../../components/ProductCard/ProductCard';

function MyProducts() {
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  //const [user, setUser] = useState();

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

  console.log(myProducts);

  return (
    <div className="containerProducts">
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

export default MyProducts;
