import React, { useContext } from 'react'
import "./styles.css";
import { useGetProducts } from '../../hooks/useGetProducts';
import { IProduct } from '../../models/interfaces';
import { IShopContext, ShopContext } from '../../context/shop-context';
import CartItem from './CartItem';

const CheckoutPage = () => {
  const {getCartItemCount, getTotalCartAmount} = useContext<IShopContext>(ShopContext)
  const { products } = useGetProducts();

  const totalAmount = getTotalCartAmount();

  return (
    <div className='cart'>
      <div>
        <h1>Your Cart Items</h1>
      </div>
    <div className="cart">

      {products.map((product: IProduct)=>{
        if (getCartItemCount(product._id) !== 0) {
          return <CartItem product={product}/>
        }  
      }
      )}
    </div>
{
  totalAmount > 0 ? (

    <div className="checkout">
      <p>Subtotal: ${totalAmount.toFixed(2)}</p>
      <button>Continue Shopping</button>
      <button>Checkout </button>
    </div>
    ) : (
      <h1>Your Shopping Cart is Empty!</h1>
    )
  }
    </div>
  )
}

export default CheckoutPage