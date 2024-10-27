import React from 'react'
import { Routes,Route } from 'react-router';
import Home from './home';
import Product from './product'
import Cart from './cart'

interface Props {
    product: any; 
    category: any; 
    categoryAll: any;
    addToCart: any;
    cart:any;
    setCart: any;
}

const Rout: React.FC<Props> = ({ product, category, categoryAll, addToCart, cart, setCart }) => {
return(
<>
<Routes>
<Route path='/' element={<Home addToCart={addToCart}/>}/>
<Route path='product' element={<Product product={product} category={category} categoryAll={categoryAll} addToCart={addToCart} />}/>
<Route path='cart' element={<Cart cart={cart} setCart={setCart}/>}/>

</Routes>
</>
)
}
export default Rout;