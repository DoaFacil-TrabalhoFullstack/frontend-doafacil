import React, { useState } from 'react';
import './home.css';
import { Link } from "react-router-dom";
import homeProduct from "./Home_product";
import { AiFillEye } from 'react-icons/ai'

interface homeProps {
    addToCart: any;
}

const Home: React.FC<homeProps> = ({addToCart}) => {
    const [trendingProduct,setTrendingProduct] = useState(homeProduct)

    //Filtrando por produtos (Novo, destaque e mais doado)

    const filtercate = (x: string) =>
{
    const filterproduct = homeProduct.filter((curElm) =>
    {
    return curElm.type === x
    })
    setTrendingProduct(filterproduct)
}
    //produtos em alta
    const allTrendingProduct = () =>
{
        setTrendingProduct(homeProduct)
}

return(
<>
<div className='home'>
    <div className='trending'>
        <div className='container'>
            <div className='container_box'>
            <div className='header'>
                <div className='heading'>
                <a href="#" onClick={() => allTrendingProduct()}><h2>Produto em alta</h2></a>
                </div>
                <div className='cate'>
                    <a href="#" onClick={() => filtercate ('new')}><h3 >Novo</h3></a>
                    <a href="#" onClick={() => filtercate ('featured')}><h3 >Destaque</h3></a>
                    <a href="#" onClick={() => filtercate ('top')}><h3 >Mais doado</h3></a>           
                </div>
            </div>
            
            <div className='products'>
                <div className='container'>
                    {
                        trendingProduct.map((curElm) =>
                        {
                            return(
                                <>
                                <div className='box'>
                                    <div className='img_box'>
                                        <img src={curElm.image} alt=''></img>
                                    </div>
                                    <div className='info'>
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
</div>
</>
)
}
export default Home;


