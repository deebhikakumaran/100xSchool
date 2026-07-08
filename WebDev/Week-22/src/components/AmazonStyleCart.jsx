import React, {useState} from 'react'
import Header from "./Header"
import { Minus, Plus } from 'lucide-react';
import {useCartStore} from '../store/cartItemsState'
import useCartTotalSelector from '../store/cartTotalSelector'
import "./AmazonStyleCart.css"
import PurchaseModal from './PurchaseModal'

const AmazonStyleCart = () => {
  const [showModal, setShowModal] = useState(false)
  const {totalQuantity, totalPrice} = useCartTotalSelector()
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div className="card-container">
      <Header />
      <div className='card-content'>
        <div className="left-bar">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (<div>Cart is empty</div>) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <h4>{item.name}</h4>
                    <p style={{ color: '#48bb78' }}>In stock</p>
                    <button aria-label="decrease quantity" onClick={() => {
                      if(item.quantity === 0) removeFromCart(item.id)
                      if(item.quantity > 0) updateQuantity(item.id, item.quantity - 1)
                    }}> 
                      <Minus size={16} /> 
                    </button>
                    <span data-testid={`quantity-${item.id}`}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}> 
                      <Plus size={16} />
                    </button>
                    <button onClick={() => removeFromCart(item.id)}> Delete </button>              
                  </div>
                  <div>{item.price}</div>
                </div>
              ))}
            </div>
          )}
          
        </div>
        <div className="right-bar">
          <h2>Order Summary</h2>
          <p>Items ({totalQuantity}): <b>{totalPrice.toFixed(2)}</b></p>
          <div>Order Total: {totalPrice}</div>
          <button className="buy-btn" onClick={() => setShowModal(true)}>Proceed to Buy</button>
        </div>
      </div>

      {showModal && <PurchaseModal totalPrice={totalPrice} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default AmazonStyleCart