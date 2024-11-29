import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Produtos from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import MyInterest from './pages/MyInterest';
import RegisterProduct from './pages/RegisterProduct';
import MyProducts from './pages/MyProducts';

const AppRoutes = () => {
  return (
    //Habilita navegação por rotas baseado no histórico do navegador
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/produtos" element={<Produtos />}></Route>
        <Route path="/produto/:id" element={<ProductDetails />} />
        <Route path="/cadastro-produto/" element={<RegisterProduct />} />
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/meus-interesses" element={<MyInterest />}></Route>
        <Route path="/meus-produtos" element={<MyProducts />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
