import React, { useState, useEffect } from 'react';
import './ProdutoStyles.css';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

import ProductCard from '../../components/ProductCard/ProductCard';
import httpClient from '../../shared/http-client/http-client';

interface Product {
  id: number;
  name: string;
  description: string;
}

const Produtos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  const token = localStorage.getItem('token');

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

  const totalPages = Math.ceil(products.length / productsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

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
      return;
    }

    const filteredProducts = products.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );

    if (filteredProducts.length === 0) {
      alert('Nenhum produto encontrado!');
    } else {
      setProducts(filteredProducts);
    }
  };

  return (
    <>
      <div className="search_box">
        <input
          type="text"
          value={search}
          placeholder="Pesquisar"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button onClick={searchProduct}>
          <AiOutlineSearch />
        </button>
      </div>

      <div className="products">
        <div className="containerProducts">
          {currentProducts.map((currentProduct) => (
            <Card
              sx={{ minWidth: 275, margin: '0 10px' }}
              key={currentProduct.id}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {currentProduct.name}
                </Typography>
                <Typography variant="body2">
                  {currentProduct.description}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  href={'/produto/' + currentProduct.id}
                >
                  Ver mais
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>

      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1 || products.length <= productsPerPage}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === totalPages || products.length <= productsPerPage
          }
        >
          Próxima
        </button>
      </div>
    </>
  );
};

export default Produtos;
