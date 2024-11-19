import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

import homeProduct from './homeProduct';

import './styles.css';
import Product from '../Products';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Home() {
  const [product, setProduct] = useState(homeProduct);
  const [search, setSearch] = useState('');
  const [recentProducts, setRecentProducts] = useState(homeProduct);

  const quantityHomeProducts = 5;

  // Função para buscar produtos com base na pesquisa
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
      setRecentProducts(filteredProducts); // Atualiza a seção de "recentProducts"
    }
  };

  //Filtrando por produtos (Novo, destaque e mais doado)

  // const filtercate = (x: string) => {
  //   const filterproduct = homeProduct.filter((curElm) => {
  //     return curElm.type === x
  //   })
  //   setTrendingProduct(filterproduct)
  // }
  //produtos em alta
  const mostRecentProducts = () => {
    setRecentProducts(homeProduct);
    setProduct(homeProduct);
  };

  return (
    <>
      <Nav
        search={search}
        setSearch={setSearch}
        searchProduct={searchProduct}
        enable={true}
      />
      <div className="home">
        <div className="trending">
          <div className="container">
            <div className="container_box">
              <div className="header">
                <div className="heading">
                  <a href="#" onClick={() => mostRecentProducts()}>
                    <h2>Produtos recém adicionados</h2>
                  </a>
                </div>
              </div>

              <div className="products">
                <div className="containerProducts">
                  {recentProducts
                    .slice(0, quantityHomeProducts)
                    .map((currentProduct) => {
                      return (
                        <ProductCard
                          key={currentProduct.id}
                          title={currentProduct.title}
                          description={currentProduct.description}
                          imageUrl={currentProduct.image}
                          url={'/produto/' + currentProduct.id}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
