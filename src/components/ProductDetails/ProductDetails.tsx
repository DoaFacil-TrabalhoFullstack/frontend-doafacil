import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import homeProduct from '../../pages/Home/homeProduct';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const filterProduct = homeProduct.find((x) => x.id.toString() === id);
  console.log(filterProduct);

  // if (loading) {
  //     return <p>Carregando detalhes do produto...</p>;
  // }

  // if (!product) {
  //     return <p>Produto não encontrado.</p>;
  // }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <img
        src={filterProduct?.image}
        alt={filterProduct?.title}
        style={{ width: '300px', height: '200px', objectFit: 'cover' }}
      />
      <h1>{filterProduct?.title}</h1>
      <p>{filterProduct?.description}</p>
    </div>
  );
};

export default ProductDetails;
