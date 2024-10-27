import React from 'react';
import { MdLocalShipping } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import { CiUser } from 'react-icons/ci'
import { Link } from 'react-router-dom';

import './nav.css'


interface NavProps {
    search: any; 
    setSearch: any; 
    searchProduct: any; 
}
const Nav : React.FC<NavProps> = ({ search, setSearch, searchProduct})=>{
    
return (
<>
    <div className='header'>
        <div className= 'top_header'>
            <div className= 'icon'>
            <MdLocalShipping/>
            </div>
            <div className= 'info'>
                <p>Faça aqui sua doação</p>
            </div>    
        </div>
        <div className = 'mid_header'>
            <div className='logo'>
                <img src = 'image/logoDoafacil.png' alt='logo'></img>
            </div>
            <div className= 'search_box'>
                <input type='text' value={search} placeholder='search' onChange={(e) => setSearch(e.target.value)}></input>
                <button onClick={searchProduct}><AiOutlineSearch/></button>
            </div>
            <div className= 'user'>
                <div className='icon'>
                    <FiLogIn/>
                </div>
                <div className='btn'>
                    <button>Login</button>
                </div>
            </div>
        </div>
        <div className = 'last_header'>
            <div className='user_profile'>
                    <div className='icon'>
                        <CiUser/>
                    </div>
                    <div className='info'>
                        <p>Please Login</p>
                    </div>       
            </div>
            <div className='nav'>
                <ul>
                    <li><Link to ='/' className='link'>Página inicial</Link></li>
                    <li><Link to ='/product' className='link'>Produtos</Link></li>
                    <li><Link to ='/cart' className='link'>Carrinho</Link></li>
                </ul>
            </div>
        </div>    
    </div>
</> 
);
}

export default Nav;
