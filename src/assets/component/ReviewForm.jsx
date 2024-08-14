import React, { useState } from 'react';
import './ReviewForm.css'; // Import your CSS file

const ReviewForm = ({ property, onAddReview }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview({ propertyId: property.id, review });
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Leave a Review</h3>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
