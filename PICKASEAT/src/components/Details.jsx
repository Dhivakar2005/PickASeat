import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './../App.css';

const Details = () => {
  const { id } = useParams();
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

  const castMembers = [
    { name: "Mason Thames", img: "/src/assets/man.png" },
    { name: "Nico Parker", img: "/src/assets/cg.png" },
    { name: "Gerard Butler", img: "/src/assets/man.png" },
    { name: "Nick Frost", img: "/src/assets/cg.png" },
    { name: "Julian Dennison", img: "/src/assets/ab.png" },
    { name: "Gabriel Howell", img: "/src/assets/man.png" },
    { name: "Bronwyn James", img: "/src/assets/cg.png" },
  ];

  const movies = [
    { title: "Mission: Impossible – The FC", year: "2025", genre: "Action | Adventure", duration: "2h 50m", rating: "7.2", image: "/src/assets/gog.png" },
    { title: "How to Train Your Dragon", year: "2025", genre: "Action | Family", duration: "2h 5m", rating: "7.6", image: "/src/assets/dragon.png" },
    { title: "K.O.", year: "2025", genre: "Action | Drama", duration: "1h 24m", rating: "7.4", image: "/src/assets/ko.png" },
    { title: "STRAW", year: "2025", genre: "Thriller | Drama", duration: "1h 45m", rating: "8.3", image: "/src/assets/straw.png" }
  ];

  const movieIndex = parseInt(id);
  const movie = movies[movieIndex];

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
            <img src='/src/assets/Searchicon.png' alt='search' />
              <Link to="/login">
                <button>Login</button>
              </Link>
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
          <p className="description">
            On the rugged Isle of Berk, where Vikings and dragons have been bitter enemies for generations,
            Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a fierce Night Fury dragon...
          </p>
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
          {castMembers.map((member, idx) => (
            <div className="cast-member" key={idx}>
              <img src={member.img} alt={`Cast: ${member.name}`} />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="date" className="date-selector">
        <div className="dates">
          <button onClick={handlePrev} disabled={startIndex === 0}>{'<'}</button>

          {visibleDates.map((item, idx) => (
            <span
              key={idx}
              className={`date-box ${item.date === selectedDate ? 'selected-date' : ''}`}
              onClick={() => handleDateClick(item.date)}
            >
              <span className="day">{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span className="date">{new Date(item.date).getDate()}</span>
              <span className="month">{new Date(item.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
            </span>
          ))}

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
          <button id="book-now-btn" className="book-now" disabled={!selectedDate || !theater || !location}>
            Book Now
          </button>
        </Link>
      </section>

      
            <div className="movie-list">
              {movies.map((movie, index) => (
                <div className="movie-card" key={index}>
                  <div className="movie-image" style={{ backgroundImage: `url(${movie.image})` }}></div>
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-info">
                    {movie.year} • {movie.genre} • {movie.duration}
                  </p>
                  <div className="movie-footer">
                    <Link to={`/details/${index}`}>
                      <button className="buy-button">Buy Tickets</button>
                    </Link>
                    <div className="rating">⭐ {movie.rating}</div>
                  </div>
                </div>
              ))}
            </div>
    </div>
  );
};

export default Details;
