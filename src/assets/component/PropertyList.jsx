

import React, { useState } from 'react';
import ReviewForm from './ReviewForm'; // Import ReviewForm
import './PropertyList.css'; // Import CSS for styling

// Import images
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';
import img5 from '../images/img5.jpg';
import img6 from '../images/img6.jpg';

const PropertyList = ({ onAddToCart, onSelectProperty }) => {
  // State to manage reviews for each property
  const [reviews, setReviews] = useState({});
  const [showReviewForm, setShowReviewForm] = useState({});

  // Function to handle adding a review
  const handleAddReview = (review) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [review.propertyId]: [...(prevReviews[review.propertyId] || []), review.review],
    }));
  };

  // Function to toggle review form visibility
  const toggleReviewForm = (propertyId) => {
    setShowReviewForm((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  // Example properties with corrected image paths
  const properties = [
    { id: 1, title: 'Cozy Apartment', description: 'A nice place to stay', price: 100, image: img1 },
    { id: 2, title: 'Luxury Villa', description: 'Spacious and comfortable', price: 300, image: img2 },
    { id: 3, title: 'Modern Loft', description: 'Stylish and central', price: 150, image: img3 },
    { id: 4, title: 'Beachside Cottage', description: 'Relaxing and scenic', price: 250, image: img4 },
    { id: 5, title: 'City Center Flat', description: 'Convenient and cozy', price: 120, image: img5 },
    { id: 6, title: 'Rural Retreat', description: 'Peaceful and charming', price: 180, image: img6 },
  ];

  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property-item">
          <img src={property.image} alt={property.title} className="property-image" />
          <h3>{property.title}</h3>
          <p>{property.description}</p>
          <p>${property.price} per night</p>
          <button onClick={() => onSelectProperty(property)}>Book Now</button>
          
          {/* Toggle review form visibility */}
          <button onClick={() => toggleReviewForm(property.id)}>
            {showReviewForm[property.id] ? 'Hide Review Form' : 'Add a Review'}
          </button>
          
          {/* Conditional rendering of the review form */}
          {showReviewForm[property.id] && (
            <ReviewForm property={property} onAddReview={handleAddReview} />
          )}

          {/* Display the reviews and review count */}
          <div className="reviews">
            <h4>{reviews[property.id]?.length || 0} Reviews</h4>
            {reviews[property.id]?.map((review, index) => (
              <p key={index}>"{review}"</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;

