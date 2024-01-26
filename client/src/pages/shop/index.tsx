import React from 'react'
import { useGetProducts } from '../../hooks/useGetProducts'
import Product from './Product';
import './styles.css'

const ShopPage = () => {
  const { products } = useGetProducts(); 
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