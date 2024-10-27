import React from 'react'
import './footer.css'
import { FaHeadphonesAlt } from 'react-icons/fa'
import { MdLocalShipping } from 'react-icons/md'
import { FiCheck } from "react-icons/fi";



const Footer = () => {
    return(
    <>
    <div className='footer'>
        <div className='container'>
            <div className='left-box'>
                <div className='box'>
                    <div className='icon_box'>
                        <FiCheck />
                    </div>
                        <div className='detail'>
                            <h3>Anuncie já seu produto</h3>
                    </div>
                </div>
                <div className='box'>
                    <div className='icon_box'>
                        <FaHeadphonesAlt/>
                    </div>
                    <div className='detail'>
                        <h3>Suporte 24/7</h3>
                    </div>
                </div>
                <div className='box'>
                    <div className='icon_box'>
                        <MdLocalShipping/>
                    </div>
                    <div className='detail'>
                        <h3>Frete grátis</h3>
                    </div>
                </div>
            </div>
            <div className='right-box'>
                <div className='header'>
                    <img src="image/logoDoaFacil.png" alt="logo" />
                    <p>Nosso intuito é te ajudar</p>
                </div>
                <div className='bottom'>
                    <div className='box'>
                        <h3>Contato</h3>
                        <ul>
                            <li>Rio de Janeiro, Rio de Janeiro</li>
                            <li>(21) 98023-8988</li>
                            <li>doafacil@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
    }
    export default Footer;