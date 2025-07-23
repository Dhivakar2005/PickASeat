import  { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './../App.css';

const Booking = () => {
  const location = useLocation();
  const {
    selectedDate,
    selectedTime: initialSelectedTime,
    selectedSeats: initialSelectedSeats,
    movieName,
    movieImage,
    theaterName,
    theaterLocation,
  } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState(initialSelectedSeats || []);
  const [selectedTime, setSelectedTime] = useState(initialSelectedTime || null);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
      const key = `${selectedDate}-${selectedTime}`;
      const storedSeats = bookings[key] || [];
      setBookedSeats(storedSeats);
    }
  }, [selectedDate, selectedTime]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error('Please select time first');
    }

    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
    const key = `${selectedDate}-${selectedTime}`;
    const latestBookedSeats = bookings[key] || [];
    if (latestBookedSeats.includes(seatId)) {
      return toast.error('Seat already booked');
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast.error('You can only select 5 seats');
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setSelectedSeats([]);
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="seat-row">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        const isBooked = bookedSeats.includes(seatId);
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`seat-button ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
            disabled={isBooked}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  const navigate = useNavigate();

  const handleProceedToPay = () => {
    if (!selectedTime || selectedSeats.length === 0) return;
    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
    const key = `${selectedDate}-${selectedTime}`;
    const currentBooked = bookings[key] || [];
    const newBooked = Array.from(new Set([...currentBooked, ...selectedSeats]));
    bookings[key] = newBooked;
    localStorage.setItem('bookings', JSON.stringify(bookings));
    setBookedSeats(newBooked);
    navigate('/payment', {
      state: {
        selectedSeats,
        selectedDate,
        selectedTime,
        movieName,
        movieImage,
        theaterName,
        theaterLocation,
      },
    });
  };

  return (
    <div className="nav1">
      <section className="navbar">
        <img className="logoo" src="/src/assets/logoo.png" alt="Logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/mybooking">MyBookings</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
        <div className="search">
            <img src='/src/assets/Searchicon.png' alt='search' />
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login">
                <button>Login</button>
              </Link>
            )}
          </div>
      </section>

      <div className="book">
        <div className="time">
          <h1>Available Timing</h1>
          <ul>
            {['06:00 AM', '09:00 AM', '12:30 PM', '04:00 PM', '08:00 PM'].map((time) => (
              <li
                key={time}
                className={selectedTime === time ? 'active' : ''}
                onClick={() => handleTimeClick(time)}
              >
                <img src="/src/assets/clock.png" alt="clock" />
                {time}
              </li>
            ))}
          </ul>
        </div>

        <div className="seat">
          <div className="sside">
            <h1>Select Your Seat</h1>
            <img src="/src/assets/screenImage.svg" alt="screen" />
            <h2>SCREEN SIDE</h2>
          </div>

          <div className="seat-group">
            <div className="centered-rows">
              {['A', 'B'].map((row) => renderSeats(row))}
            </div>
            {[['C', 'D'], ['E', 'F']].map((pair, idx) => (
              <div key={idx} className="split-row">
                {pair.map((row) => renderSeats(row))}
              </div>
            ))}
            <div className="seatgj">
              {[['G', 'H'], ['I', 'J']].map((pair, idx) => (
                <div key={idx} className="split-row1">
                  {pair.map((row) => renderSeats(row))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="selected-details">
        <h2>Booking Info</h2>
        <p>Selected Date: {selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB') : 'No date selected'}</p>
        <p>Selected Time: {selectedTime || 'None'}</p>
        {/* <p>Theater: {theaterName || 'Unknown Theater'}</p>
        <p>Location: {theaterLocation || 'Unknown Location'}</p> */}
      </div>

      <div className="book-button-container">
        <button
          className="book-now"
          disabled={!selectedTime || selectedSeats.length === 0}
          onClick={handleProceedToPay}
        >
          Proceed To Pay →
        </button>
      </div>
    </div>
  );
};

export default Booking;
