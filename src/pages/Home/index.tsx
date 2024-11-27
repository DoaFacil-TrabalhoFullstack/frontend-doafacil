import React, { useState } from 'react';

import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

import './styles.css';
import ProductCard from '../../components/ProductCard/ProductCard';

import homeProduct from './homeProduct';

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
    const filteredProducts = product.filter(
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
