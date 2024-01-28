import React, { useContext } from 'react'
import { useGetProducts } from '../../hooks/useGetProducts'
import Product from './Product';
import './styles.css'
import { IShopContext, ShopContext } from '../../context/shop-context';
import { Navigate } from 'react-router-dom';

const ShopPage = () => {
  const { products } = useGetProducts(); 
  const {isAuthenticated} = useContext<IShopContext>(ShopContext);

  if(!isAuthenticated) {
    return <Navigate to="/auth" />
  }

  return (
    <div className='shop'>
      <div className="products">

        { products?.map((product)=>(
          <Product product={product}/>
        )) }
      </div>
    </div>
  )
}

export default ShopPage