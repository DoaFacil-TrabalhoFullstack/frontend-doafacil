import React, { useEffect, useState } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { FiLogIn } from 'react-icons/fi';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import AppRoutes from './Routes';
import { AuthProvider } from './context/AuthProvider';
import './styles.css';

function App() {
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState('');
  //const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem('emailUser');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

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

          {token ? (
            <a href="/profile" className="profile">
              <AccountCircleIcon />
              <span className="username">{email}</span>
            </a>
          ) : (
            <div></div>
          )}

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
