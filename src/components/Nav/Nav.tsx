import React from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import './Nav.css';

interface NavProps {
  search: any;
  setSearch: any;
  searchProduct: any;
}
const Nav: React.FC<NavProps> = ({ search, setSearch, searchProduct }) => {
  return (
    <>
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
              <img src="image/logoDoafacil.png" alt="logo"></img>
            </a>
          </div>
          <div className="search_box">
            <input
              type="text"
              value={search}
              placeholder="search"
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <button onClick={searchProduct}>
              <AiOutlineSearch />
            </button>
          </div>
          <div className="user">
            <div className="icon">
              <FiLogIn />
            </div>
            <div className="login_link">
              <a href="/login">Login</a>
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
    </>
  );
};

export default Nav;
