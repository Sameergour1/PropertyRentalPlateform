

import React from 'react';
import './Favorites.css'; // Import the CSS file for styling

const Favorites = ({ properties, favorites, onToggleFavorite }) => {
  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      {properties.length === 0 ? (
        <p>No properties available.</p>
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property.id} className="favorite-item">
              <img src={property.image} alt={property.title} className="favorite-image" />
              <div className="favorite-info">
                <h3>{property.title}</h3>
                <p>${property.price} per night</p>
                {/* Conditional rendering for "Remove from Favorites" */}
          {favorites.some((fav) => fav.id === property.id) && (
            <button onClick={() => onToggleFavorite(property)}>Remove from Favorites</button>
          )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
