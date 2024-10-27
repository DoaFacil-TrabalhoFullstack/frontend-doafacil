import React, { useState } from 'react'
import './product.css'
import { AiFillEye, AiOutlineClose } from 'react-icons/ai'

interface ProductProps {
    product: any;
    category: any;
    categoryAll: any; 
    addToCart: any;
}

const Product : React.FC<ProductProps> = ({ product, category, categoryAll,addToCart }) => {
    return(
    <>
        <div className='product'>
            <h2># Produtos</h2>
            <p>Home . produtos</p>
            <div className='container'>
                <div className='left_box'>
                    <div className='category'>
                        <div className='header'>
                            <a href="#" onClick={() => categoryAll()}><h3>Categorias</h3></a>
                        </div>
                        <div className='box'>
                            <ul>
                                <li><a href="#" onClick={() => category("tv")}># tv</a></li>
                                <li><a href="#" onClick={() => category("laptop")}># laptop</a></li>
                                <li><a href="#" onClick={() => category("watch")}># watch</a></li>
                                <li><a href="#" onClick={() => category("speaker")}># speaker</a></li>
                                <li><a href="#" onClick={() => category("eletronics")}># eletronics</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='right_box'>
                    <div className='product_box'>
                        <div className='product_container'>
                            {
                                product.map((curElm : any) =>{
                                    return(
                                        <>
                                        <div className='box'>
                                            <div className='img_box'>
                                                <img src={curElm.image} alt=''></img>
                                            </div>
                                            <div className='detail'>
                                                <h3>{curElm.name}</h3>
                                                <button onClick={() => addToCart(curElm)}>Tenho interesse</button>
                                            </div>
                                        </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
    }
    export default Product;