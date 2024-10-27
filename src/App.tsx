import React, { useState } from 'react';
import Nav from './Components/Header/nav';
import { BrowserRouter, Route } from 'react-router-dom';
import Rout from './Components/Header/rout'
import Footer from './Components/Header/footer'
import homeProduct from './Components/Header/Home_product';

const App = () =>{

  //Pagina produto
  const [product, setProduct] = useState(homeProduct)
  //Barra de pesquisa
  const [search, setSearch] = useState('')
  //Adicione ao carrinho
  const [cart,setCart] = useState([])

  //Pagina produto categoria
  const category = (x: string) => {

    const categoryfilter = homeProduct.filter((product) =>
    {
      return product.cat === x;
    })
    setProduct(categoryfilter)
  }

  //Todas as categorias
  const categoryAll = () =>
  {
    setProduct(homeProduct)
  }

  //Barra de pesquisa
  const searchLength = (search || []).length === 0

  const searchProduct = () =>
  {

  if (searchLength) {
    alert("Por favor digite algo")
    setProduct(homeProduct)
  }
  else{
    
      const searchFilter = homeProduct.filter((x) =>
      {
        return x.cat === search
      })
      setProduct(searchFilter)
  }
  }

  //Adicionar ao carrinho
  const addToCart = (product:any) => 
  {
    const exist = cart.find((x:any) =>{
      return x.id === product.id
    })
    if(exist){
      alert("este produto já foi adicionado ao carrinho")
    }
    else{
      setCart(cart.concat({...product, qty: 1}));
      alert("Adicionado ao carrinho")
    }
    
  }

 
  return (
    <>
    <BrowserRouter>
    <Nav search={search} setSearch={setSearch} searchProduct= {searchProduct}/>
    <Rout product = {product} category = {category} categoryAll = {categoryAll} addToCart={addToCart} cart={cart} setCart={setCart}/>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

  


export default App;
