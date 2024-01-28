import React, { useContext } from 'react'
import { IShopContext, ShopContext } from '../../context/shop-context';
import "./styles.css";

const PurchasedItemsPage = () => {
  const {purchasedItems, addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);
  return (
    <div className='purchased-items-page'>
      <h1>Previously Purchased Items</h1>
      <div className="purchased-items">
        {purchasedItems.map((item)=>{
          const countProduct = getCartItemCount(item._id);
          return (
            <div className="item">
              <h3>{item.productName}</h3>
              <img src={item.imageURL} />
              <p>${item.price}</p>
              <button className='add-to-cart-btn' onClick={()=>addToCart(item._id)}>Purchase Again {countProduct > 0 && <>({countProduct})</>}</button>
            </div>
          )
        })}
      </div>
      </div>
  )
}

export default PurchasedItemsPage