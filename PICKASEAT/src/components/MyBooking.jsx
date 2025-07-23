import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../App.css';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
        setBookings(storedBookings);
    }, []);

    return (
        <div className='nav1'>
            <section className='navbar'>
                <img className='logoo' src="/src/assets/logoo.png" alt="logo" />
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/movies">Movies</Link></li>
                    <li><Link to="/mybooking">MyBookings</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                </ul>
                <div className="search">
                            <img src='/src/assets/Searchicon.png' alt='search' />
                            <Link to="/login">
                                <button>Login</button>
                              </Link>
                </div>
            </section>

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
                    }}
                    style={{
                        marginTop: '20px',
                        padding: '8px 16px',
                        background: '#f44336',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Clear All Bookings
                </button>
            </div>
        </div>
    );
};

export default MyBooking;
