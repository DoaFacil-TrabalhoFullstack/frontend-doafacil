import React, { useEffect, useState } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { FiLogIn } from 'react-icons/fi';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import AppRoutes from './Routes';
import { AuthProvider } from './context/AuthProvider';

import './styles.css';
import axios from 'axios';

const App = () => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('emailUser');
  const [username, setUsername] = useState('');
  const [isDonator, setIsDonator] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('emailUser');
    if (storedEmail) {
      getUsername();
    }
  }, []);

  const getUsername = async () => {
    try {
      const response = await axios.get('http://localhost:8080/v1/users/list', {
        params: { emailUser: email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;
      setUsername(user.name);

      if (user.cnpj) {
        setIsDonator(true);
        localStorage.setItem('typePerson', 'JuridicalPerson');
      }
    } catch (error: any) {
      console.error(
        'Erro ao buscar os dados do usuário:',
        error.response || error,
      );
    }
  };

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
                alt="logo"></img>
            </a>
          </div>

          {token ? (
            <a href="/profile" className="profile">
              <AccountCircleIcon />
              <span className="username">{username}</span>
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
              {username ? (
                isDonator ? (
                  <a href="/meus-produtos" className="link">
                    Meus produtos
                  </a>
                ) : (
                  <a href="/meus-interesses" className="link">
                    Meus interesses
                  </a>
                )
              ) : (
                <></>
              )}
            </li>
          </ul>

          {isDonator ? (
            <a className="btnCadastroProduto" href="/cadastro-produto">
              Cadastrar produto
            </a>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <AppRoutes></AppRoutes>
    </AuthProvider>
  );
};

export default App;
