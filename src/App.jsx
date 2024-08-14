

import React, { useState, useEffect } from 'react';
import PropertyList from './assets/component/PropertyList';
import Cart from './assets/component/Cart';
import Checkout from './assets/component/Checkout';
import BookingForm from './assets/component/BookingForm';
import LoginForm from './assets/component/LoginForm';
import RegisterForm from './assets/component/RegisterForm';
import Favorites from './assets/component/Favorites';
import { AuthProvider, useAuth } from './assets/component/AuthContext';
import './App.css'; // Import the CSS file for overall styling

// Import the logo image
import logoImage from './assets/images/img8.avif';
import logoImage1 from './assets/images/img7.png';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { user } = useAuth();
  const [scrollToBooking, setScrollToBooking] = useState(false);

  const handleAddToCart = (property) => {
    setCartItems((prevItems) => [...prevItems, property]);
    setScrollToBooking(true); // Scroll to booking section when item is added
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setIsCheckout(false);
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setScrollToBooking(true); // Scroll to booking section when property is selected
  };

  const handleToggleFavorite = (property) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === property.id)) {
        return prevFavorites.filter((fav) => fav.id !== property.id);
      } else {
        return [...prevFavorites, property];
      }
    });
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  useEffect(() => {
    if (scrollToBooking) {
      document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
      setScrollToBooking(false);
    }
  }, [scrollToBooking]);

  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <img src={logoImage} alt="Logo" />
          <h1>Property Rental Platform</h1>
        </div>
        <div className="navbar">
          {user && (
            <>
              <button className="cart-toggle" onClick={toggleCartVisibility}>
                Cart ({cartItems.length})
              </button>
              <div className="user-info">
                <img src={logoImage1} alt="User Avatar" className="user-avatar" />
                <span>{user.email}</span>
              </div>
            </>
          )}
        </div>
      </header>
      {isCartVisible && (
        <Cart
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
        />
      )}
      <main className="main-content">
        {!user ? (
          <div className="auth-forms">
            <LoginForm />
            <RegisterForm />
          </div>
        ) : !isCheckout ? (
          <>
            <PropertyList
              onAddToCart={handleAddToCart}
              onSelectProperty={handleSelectProperty}
              onAddToFavorites={handleToggleFavorite}
            />
            <Favorites
              properties={cartItems} // Display properties in cartItems
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
            {cartItems.length > 0 && (
              <button className="checkout-button" onClick={() => setIsCheckout(true)}>Proceed to Checkout</button>
            )}
            {selectedProperty && (
              <div id="booking-section">
                <BookingForm
                  property={selectedProperty}
                  onAddToCart={handleAddToCart}
                />
              </div>
            )}
          </>
        ) : (
          <Checkout cartItems={cartItems} onClearCart={handleClearCart} />
        )}
      </main>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
