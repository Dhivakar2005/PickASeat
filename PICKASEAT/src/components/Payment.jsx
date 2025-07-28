import  { useState } from 'react';
import toast from 'react-hot-toast';
import {useLocation, useNavigate} from 'react-router-dom';
import './../App.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');

  const {
    selectedSeats = [],
    selectedDate,
    selectedTime,
    movieName,
    movieImage,
    theaterName,
    theaterLocation,
  } = location.state || {};

  const handlePayment = () => {
    if (!customerName.trim()) {
      toast.error('Please enter your name!');
      return;
    }

    const newBooking = {
      customerName,
      selectedSeats,
      selectedDate,
      selectedTime,
      movieName,
      movieImage,
      theaterName,
      theaterLocation,
      price: selectedSeats.length * 180
    };

    const existingBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
    localStorage.setItem('myBookings', JSON.stringify([...existingBookings, newBooking]));

    toast.success('Payment Successful 🎉');
    navigate('/mybooking');
  };

  return (
      <div className="payment-page">
        <div
          className="ticket-card-glass"
          style={{ backgroundImage: `url(${movieImage})` }}
        >
          <h2 className="movie-title1">{movieName || 'Unknown Movie'}</h2>

          <div className="ticket-info">
            <input
            type="text"
            className="customer-name-input"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

            <div className="info-row">
              <span>Date</span>
              <span>{selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB') : 'None'}</span>
            </div>
            <div className="info-row">
              <span>Time</span>
              <span>{selectedTime || 'None'}</span>
            </div>
            <div className="info-row">
              <span>Seats</span>
              <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
            </div>
            <div className="info-row">
              <span>Price</span>
              <span>₹ {selectedSeats.length * 180}</span>
            </div>
            <div className="info-row">
              <span>Cinema</span>
              <span>{theaterName || 'Unknown Theater'}</span>
            </div>
            <div className="info-row">
              <span>Location</span>
              <span>{theaterLocation || 'Unknown Location'}</span>
            </div>
          </div>
          <button className="pay-btn" onClick={handlePayment}>Pay Now →</button>
        </div>
      </div>
  );
};

export default Payment;
