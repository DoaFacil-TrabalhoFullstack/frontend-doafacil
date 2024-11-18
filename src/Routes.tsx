import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Produtos from './pages/Produtos';
import ProductDetails from './components/ProductDetails/ProductDetails';

const AppRoutes = () => {
  return (
    //Habilita navegação por rotas baseado no histórico do navegador
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/produtos" element={<Produtos />}></Route>
        <Route path="/produto/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
