import React, { useEffect, useState } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { Button } from '@mui/material';

import AppRoutes from './Routes';
import Nav from './components/Nav/Nav';
import { AuthProvider } from './context/AuthProvider';

function App() {
  const token = localStorage.getItem('token');
  //const [userName, setUserName] = useState("");

  // useEffect(() => {
  //     const storedUsername = localStorage.getItem("userName");
  //     if (storedUsername) {
  //         setUserName(storedUsername);
  //     }
  // }, []);

  // const handleLogin = () => {
  //     alert("Por favor, faça o login primeiro.");
  // }

  // const cadastrarProduto = () => {
  //     alert('Carregar página cadastrar produto');
  // }

  const handleLogout = () => {
    localStorage.clear();

    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <AuthProvider>
      <div className="header">
        <div className="top_header">
          <div className="icon">
            <MdLocalShipping />
          </div>
          <div className="info">
            <p>Faça aqui sua doação</p>
          </div>
        </div>
        <div className="mid_header">
          <div className="logo">
            <a href="/">
              <img
                src="http://localhost:3000/image/logoDoafacil.png"
                alt="logo"
              ></img>
            </a>
          </div>
          <div className="user">
            <div className="icon">
              <FiLogIn />
            </div>
            <div className="login_link">
              {token ? (
                <a href="/" onClick={handleLogout}>
                  Logout
                </a>
              ) : (
                <a href="/login">Login</a>
              )}
            </div>
          </div>
        </div>
        <div className="last_header">
          <ul>
            <li>
              <a href="/" className="link">
                Página inicial
              </a>
            </li>
            <li>
              <a href="/produtos" className="link">
                Produtos
              </a>
            </li>
            <li>
              <a href="/cart" className="link">
                Carrinho
              </a>
            </li>
          </ul>
        </div>
      </div>
      <AppRoutes></AppRoutes>
    </AuthProvider>
  );
}

export default App;
