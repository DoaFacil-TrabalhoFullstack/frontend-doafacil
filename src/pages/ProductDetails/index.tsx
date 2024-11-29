import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import homeProduct from '../Home/homeProduct';

import './ProductDetails.css';
import { Button } from '@mui/material';

import httpClient from '../../shared/http-client/http-client';
import { Product } from '../../shared/interfaces/Product.interface';

const ProductDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem('token');

  //   useEffect(() => {
  //     // Buscar detalhes do produto pelo ID
  //     // fetch(`https://api.example.com/produtos/${id}`)
  //     //   .then((response) => response.json())
  //     //   .then((data) => {
  //     //     setProduct(data);
  //     //     setLoading(false);
  //     //   })
  //     //   .catch((error) => {
  //     //     console.error("Erro ao carregar produto:", error);
  //     //     setLoading(false);
  //     //   });
  //   }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await httpClient.get<Product[]>('/products/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProduct = products.find(
    (produto) => produto.id.toString() === id,
  );
  console.log(filterProduct);

  function verifyUserAndDonator(): boolean {
    const donator = localStorage.getItem('typePerson');
    const emailUser = localStorage.getItem('emailUser');
    if (donator || !emailUser) {
      return true;
    }

    return false;
  }

  // if (loading) {
  //     return <p>Carregando detalhes do produto...</p>;
  // }

  // if (!product) {
  //     return <p>Produto não encontrado.</p>;
  // }

  return (
    <>
      <div className="containerProductDetails">
        <div className="cardProductDetails">
          <h1>{filterProduct?.name}</h1>
          <p className="descriptionProductDetails">
            {filterProduct?.description}
          </p>
          <p>
            {verifyUserAndDonator() ? (
              <Button variant="outlined" color="success" disabled>
                Tenho interesse
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  console.log('clciked');
                }}
              >
                Tenho interesse
              </Button>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
