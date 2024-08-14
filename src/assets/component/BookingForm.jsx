import React, { useState } from 'react';
import './BookingForm.css'; // Import the CSS file

const BookingForm = ({ property, onAddToCart }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    if (startDate && endDate) {
      if (new Date(startDate) >= new Date(endDate)) {
        setErrorMessage('End Date must be after Start Date');
        return;
      }

      onAddToCart({
        ...property,
        startDate,
        endDate,
        totalCost: calculateTotalCost(startDate, endDate, property.price),
      });
    } else {
      setErrorMessage('Please select both start and end dates');
    }
  };

  const calculateTotalCost = (start, end, pricePerNight) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
    return Math.max(nights, 0) * pricePerNight; // Ensure non-negative cost
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h2>Book {property.title}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add to Cart</button>
    </form>
  );
};

export default BookingForm;
