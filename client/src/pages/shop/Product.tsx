import React, { useContext } from 'react'
import { IProduct } from '../../models/interfaces'
import { IShopContext, ShopContext } from '../../context/shop-context';

interface Props {
  product: IProduct;
}

const Product = (props: Props) => {

  const {_id, productName, description, price, stockQuantity, imageURL } = props.product;

  const {addToCart, getCartItemCount} = useContext<IShopContext>(ShopContext)

  const countProduct = getCartItemCount(_id);

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
      <button className='add-to-cart-btn' onClick={()=>addToCart(_id)}>Add To Cart {countProduct > 0 && <p>{countProduct}</p>}</button>
      <div className="stock-quantity">
        {stockQuantity === 0 && <h2>Out of Stock</h2>}
      </div>
    </div>
  )
}

export default Product