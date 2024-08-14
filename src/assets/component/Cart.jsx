import React from 'react';
import './Cart.css';  // Import additional CSS if needed

function Cart({ cartItems, onRemoveFromCart }) {
  return (
    <div className="cart-dropdown">
      <h2>Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <h4>{item.title}</h4>
              <p>Price: ${item.price}</p>
              <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
