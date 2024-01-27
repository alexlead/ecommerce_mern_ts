import React, { useContext } from 'react'
import { IProduct } from '../../models/interfaces';
import './styles.css';
import { IShopContext, ShopContext } from '../../context/shop-context';

interface IProps {
    product: IProduct
}
const CartItem = (props: IProps) => {
    const {_id, productName, price, stockQuantity, imageURL } = props.product;

    const { addToCart, removeFromCart, updateCartItemCount, getCartItemCount } = useContext<IShopContext>(ShopContext);

    const cartItemCount = getCartItemCount(_id);

  return (
    <div className='cart-item'>
        <img src={imageURL} />
      <div className='description'>
        <h3>{productName}</h3>

        <p>
          Price: ${price}
        </p>
      </div>
      <div className="count-handler">
        <button onClick={()=>removeFromCart(_id)}>-</button>
        <input type="number"  value={cartItemCount} onChange={(e)=> updateCartItemCount(Number(e.target.value), _id)}/>
        <button onClick={()=> addToCart(_id)}>+</button>
      </div>
        </div>
  )
}

export default CartItem