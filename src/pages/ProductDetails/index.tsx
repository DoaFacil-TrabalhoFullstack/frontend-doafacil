import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import homeProduct from '../Home/homeProduct';

import './ProductDetails.css';
import { Button } from '@mui/material';

const ProductDetails = () => {
  const { id } = useParams();

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

  const filterProduct = homeProduct.find(
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
          <img
            src={'http://localhost:3000/' + filterProduct?.image}
            alt={filterProduct?.title}
            style={{ width: '300px', height: '200px', objectFit: 'cover' }}
          />
          <h1>{filterProduct?.title}</h1>
          <p className="descriptionProductDetails">
            {filterProduct?.description}
          </p>
          <p>Fornecedor: Fulano</p>
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
