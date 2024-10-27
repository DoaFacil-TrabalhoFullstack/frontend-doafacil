import React from 'react';
import './cart.css'
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';


interface cartProps {
    cart: any;
    setCart: any; 
}


const Cart: React.FC<cartProps> = ({cart,setCart}) => {


     //Removendo produto do carrinho
  const removeProduct = (product:any) =>
  {
    const exist = cart.find((x:any) =>
    {
      return x.id === product.id
    })
    if (exist.qty > 0) {
      setCart(cart.filter((curElm:any) =>
      {
        return curElm.id !== product.id
      }))
    }
  }

    return(
    <>
        <div className='cart'>
            <h3># Cart</h3>
            {
                cart.length === 0 &&
                <>
                <div className='empty_cart'>
                    <h2>Seu carrinho está vazio</h2>
                    <Link to='/product'><button>Encontre seu produto</button></Link>
                    
                </div>
                </>
            }
            <div className='container'>
            {
                cart.map((curElm:any) => 
                {
                    return(
                        <>
                        <div className='box'>
                            <div className='img_box'>
                                <img src={curElm.image} alt="" />
                            </div>
                            <div className='detail'>
                            <div className='info'>
                                <h4>{curElm.cat}</h4>
                                <h3>{curElm.name}</h3>
                            </div>
                            <div className='icon'>
                                <li><a href="#" onClick={() => removeProduct(curElm)}><AiOutlineClose/></a></li>
                            </div>
                        </div>
                        </div>
                        </>
                    )
                })
            }    
            </div>
            <div className='bottom'>
                {
                    cart.length > 0 &&
                    <>
                    <button>Confirmar</button>
                    </>
                }
            </div>
        </div>
    </>
    )
    }
    export default Cart;