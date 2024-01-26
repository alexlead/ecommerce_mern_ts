import React from 'react'
import { IProduct } from '../../models/interfaces'

interface Props {
  product: IProduct;
}

const Product = (props: Props) => {

  const {_id, productName, description, price, stockQuantity, imageURL } = props.product;

  return (
    <div className='product'> 
      <img src={imageURL} />
      <div className='description'>
        <h3>{productName}</h3>
        <p>
        {description}
        </p>
        <p>
          ${price}
        </p>
      </div>
    </div>
  )
}

export default Product