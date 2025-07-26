import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './../App.css';
import movies from './Movie';

const Details = () => {
  const { id } = useParams(); // Getting movie ID from URL
  const [selectedDate, setSelectedDate] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [theater, setTheater] = useState('');
  const [location, setLocation] = useState('');

  const generateDatesForYear = () => {
    const start = new Date();
    const end = new Date(start.getFullYear(), 11, 31);
    const dateArray = [];
    let current = new Date(start);

    while (current <= end) {
      const iso = current.toISOString();
      const formatted = current.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      dateArray.push({ label: formatted, date: iso });
      current.setDate(current.getDate() + 1);
    }
    return dateArray;
  };

  const dates = generateDatesForYear();
  const visibleDates = dates.slice(startIndex, startIndex + 6);

  const handleDateClick = (date) => setSelectedDate(date);
  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 7, 0));
  const handleNext = () => setStartIndex((prev) => (prev + 7 >= dates.length ? prev : prev + 7));

  const movie = movies.find((m) => m.id === id);

  if (!movie) return <h2>Movie not found</h2>;

  return (
    <div className="details-page">
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
            <img src="/src/assets/Searchicon.png" alt="search" />
            <Link to="/login"><button>Login</button></Link>
          </div>
        </section>
      </div>

      <section className="movie-details">
        <div className="poster">
          <img src={movie.image} alt={movie.title} />
        </div>
        <div className="info">
          <p className="language">ENGLISH</p>
          <h1>{movie.title}</h1>
          <p className="rating">⭐ {movie.rating} User Rating</p>
          <p className="description">{movie.description}</p>
          <p className="meta">
            {movie.duration} · {movie.genre.replace(/ \| /g, ', ')} · {movie.year}
          </p>
          <div className="actions">
            <button className="trailer-btn">
              <a href="https://youtu.be/22w7z_lT6YM?si=o5ZHyQPmOkZmIcAI" target="_blank" rel="noopener noreferrer">
                🎬 Watch Trailer
              </a>
            </button>
            <a href="#date">
              <button className="buy-btn">Book Now</button>
            </a>
          </div>
        </div>
      </section>

      <section className="cast-section">
        <h2>Cast</h2>
        <div className="cast-list">
          {movie.cast && movie.cast.length > 0 ? (
            movie.cast.map((member, idx) => (
              <div className="cast-member" key={idx}>
                <img src={member.img} alt={`Cast: ${member.name}`} />
                <p>{member.name}</p>
              </div>
            ))
          ) : (
            <p>No cast information available.</p>
          )}
        </div>
      </section>

      <section id="date" className="date-selector">
        <div className="dates">
          <button onClick={handlePrev} disabled={startIndex === 0}>{'<'}</button>
          {visibleDates.map((item, idx) => {
            const isSelected =
              new Date(item.date).toDateString() === new Date(selectedDate).toDateString();
            return (
              <span
                key={idx}
                className={`date-box ${isSelected ? 'selected-date' : ''}`}
                onClick={() => handleDateClick(item.date)}
              >
                <span className="day">
                  {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="date">{new Date(item.date).getDate()}</span>
                <span className="month">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </span>
              </span>
            );
          })}
          <button onClick={handleNext} disabled={startIndex + 7 >= dates.length}>{'>'}</button>
        </div>

        <div className="dropdowns">
          <select value={theater} onChange={(e) => setTheater(e.target.value)}>
            <option value="">Select Theater</option>
            <option value="INOX">INOX</option>
            <option value="PVR">PVR</option>
            <option value="Cinepolis">Cinepolis</option>
          </select>

          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Select Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        <Link
          to="/booking"
          state={{
            selectedDate,
            movieName: movie.title,
            movieImage: movie.image,
            theaterName: theater,
            theaterLocation: location
          }}
        >
          <button
            id="book-now-btn"
            className="book-now"
            disabled={!selectedDate || !theater || !location}
          >
            Book Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Details;
