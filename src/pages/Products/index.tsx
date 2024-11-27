import React, { useState } from 'react';

import './ProdutoStyles.css';
import homeProduct from '../Home/homeProduct';
import ProductCard from '../../components/ProductCard/ProductCard';
import Nav from '../../components/Nav/Nav';

const Produtos = () => {
  const [product, setProduct] = useState(homeProduct);
  const [search, setSearch] = useState('');

  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  // Total de páginas
  const totalPages = Math.ceil(product.length / productsPerPage);

  // Produtos da página atual
  const currentProducts = product.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  // Funções de navegação
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const searchProduct = () => {
    if (search.trim() === '') {
      setProduct(homeProduct);
      return;
    }

    // Filtra os produtos com base no título ou descrição
    const filteredProducts = homeProduct.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );

    if (filteredProducts.length === 0) {
      alert('Nenhum produto encontrado!');
    } else {
      setProduct(filteredProducts); // Atualiza os produtos exibidos
    }
  };

  return (
    <>
      {/* <Nav
        search={search}
        setSearch={setSearch}
        searchProduct={searchProduct}
        enable={true}
      /> */}

      <div className="products">
        <div className="containerProducts">
          {currentProducts.map((currentProduct) => (
            <ProductCard
              key={currentProduct.id}
              title={currentProduct.title}
              description={currentProduct.description}
              imageUrl={currentProduct.image}
              url={'/produto/' + currentProduct.id}
            />
          ))}
        </div>
      </div>

      {/* Controles de paginação */}
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1 || product.length <= productsPerPage}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === totalPages || product.length <= productsPerPage
          }
        >
          Próxima
        </button>
      </div>
    </>
  );
};

export default Produtos;
