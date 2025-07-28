import { useEffect, useState } from 'react';
import './../App.css';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
        setBookings(storedBookings);
    }, []);

    return (
        <div className="my-booking-page">
            <h2 className="my-booking-title">My Bookings</h2>
            <div className="booking-card-container">
            {bookings.length === 0 && <p>No bookings yet.</p>}
                {bookings.map((booking, index) => (
                    <div key={index} className="booking-card">
                        <img className="booking-movie-image" src={booking.movieImage} alt={booking.movieName} />
                        <div className="booking-details">
                            <h3>{booking.movieName}</h3>
                            <p>2 hours 15 minutes</p>
                             <p>
                                {booking.selectedDate ? new Date(booking.selectedDate).toLocaleDateString('en-GB') : 'N/A'} • {booking.selectedTime || 'N/A'}
                            </p>
                            <p className="price">₹{booking.price}</p>
                            <p>Total Tickets: <strong>{booking.selectedSeats?.length || 0}</strong></p>
                            <p>Seat Number: <strong>{booking.selectedSeats?.join(', ') || 'None'}</strong></p>
                        </div>
                    </div>
                ))}
            </div>

                <button 
                onClick={() => {
                    localStorage.removeItem('myBookings');
                    setBookings([]);
                }}  className='mnbookbtn'          >
                Clear All Bookings
            </button>
        </div>
            );
};

export default MyBooking;
