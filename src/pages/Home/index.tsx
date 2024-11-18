import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

import homeProduct from './homeProduct';

import './styles.css';
import Product from '../Produtos';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Home() {
  //Pagina produto
  const [product, setProduct] = useState(homeProduct);
  //Barra de pesquisa
  const [search, setSearch] = useState('');
  //Adicione ao carrinho
  const [cart, setCart] = useState([]);

  //Pagina produto categoria
  // const category = (x: string) => {

  //   const categoryfilter = homeProduct.filter((product) => {
  //     return product.cat === x;
  //   })
  //   setProduct(categoryfilter)
  // }

  //Todas as categorias
  const categoryAll = () => {
    setProduct(homeProduct);
  };

  //Barra de pesquisa
  const searchLength = (search || []).length === 0;

  // const searchProduct = () => {

  //   if (searchLength) {
  //     alert("Por favor digite algo")
  //     setProduct(homeProduct)
  //   }
  //   else {

  //     const searchFilter = homeProduct.filter((x) => {
  //       return x.cat === search
  //     })
  //     setProduct(searchFilter)
  //   }
  // }

  //Adicionar ao carrinho
  const addToCart = (product: any) => {
    const exist = cart.find((x: any) => {
      return x.id === product.id;
    });
    if (exist) {
      alert('este produto já foi adicionado ao carrinho');
    } else {
      setCart(cart.concat({ ...product, qty: 1 }));
      alert('Adicionado ao carrinho');
    }
  };

  const [trendingProduct, setTrendingProduct] = useState(homeProduct);

  //Filtrando por produtos (Novo, destaque e mais doado)

  // const filtercate = (x: string) => {
  //   const filterproduct = homeProduct.filter((curElm) => {
  //     return curElm.type === x
  //   })
  //   setTrendingProduct(filterproduct)
  // }
  //produtos em alta
  const allTrendingProduct = () => {
    setTrendingProduct(homeProduct);
  };

  return (
    <>
      <Nav search={search} setSearch={setSearch} searchProduct={''} />
      <div className="home">
        <div className="trending">
          <div className="container">
            <div className="container_box">
              <div className="header">
                <div className="heading">
                  <a href="#" onClick={() => allTrendingProduct()}>
                    <h2>Produto em alta</h2>
                  </a>
                </div>
              </div>

              <div className="products">
                <div className="containerProducts">
                  {trendingProduct.map((currentProduct) => {
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
