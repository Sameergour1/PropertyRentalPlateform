import React, { useState } from 'react';
import './Checkout.css'; // Import the CSS file for styling

const Checkout = ({ cartItems, onClearCart }) => {
  const [contactInfo, setContactInfo] = useState({ name: '', email: '' });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [error, setError] = useState('');
  
  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.totalCost, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!contactInfo.name || !contactInfo.email || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
      setError('Please fill out all fields.');
      return;
    }

    // Process payment (mocked)
    console.log('Processing payment...');
    console.log('Contact Info:', contactInfo);
    console.log('Payment Info:', paymentInfo);

    // Clear the cart after successful checkout
    onClearCart();
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>Contact Information</h3>
          <label>
            Name:
            <input
              type="text"
              value={contactInfo.name}
              onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              required
            />
          </label>
        </div>

        <div className="section">
          <h3>Payment Information</h3>
          <label>
            Card Number:
            <input
              type="text"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              required
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              value={paymentInfo.expiryDate}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
              required
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              value={paymentInfo.cvv}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
              required
            />
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="summary">
          <h3>Total Cost: ${calculateTotalCost().toFixed(2)}</h3>
        </div>

        <button type="submit">Complete Booking</button>
      </form>
    </div>
  );
};

export default Checkout;
