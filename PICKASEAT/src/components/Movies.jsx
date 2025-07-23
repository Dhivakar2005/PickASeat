import React from 'react';
import { Link } from 'react-router-dom';
import './../App.css';

const Movies = () => {
  const movies = [
    {
      title: "Mission: Impossible – The FC",
      year: "2025",
      genre: "Action | Adventure",
      duration: "2h 50m",
      rating: "7.2",
      image: "/src/assets/gog.png"
    },
    {
      title: "How to Train Your Dragon",
      year: "2025",
      genre: "Action | Family",
      duration: "2h 5m",
      rating: "7.6",
      image: "/src/assets/dragon.png"
    },
    {
      title: "K.O.",
      year: "2025",
      genre: "Action | Drama",
      duration: "1h 24m",
      rating: "7.4",
      image: "/src/assets/ko.png"
    },
    {
      title: "STRAW",
      year: "2025",
      genre: "Thriller | Drama",
      duration: "1h 45m",
      rating: "8.3",
      image: "/src/assets/straw.png"
    }
  ];

  return (
    <div className="nav1">
      <section className="navbar">
        <img className="logoo" src={"/src/assets/logoo.png"} alt="Logo" />
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

      <div className="movies-h">
        <span >Recently Watched</span>
      </div>

      <div className="movie-list">
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <div
              className="movie-image"
              style={{ backgroundImage: `url(${movie.image})` }}
            ></div>
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

      <div className="movies-h">
        <span>Suggestions</span>
      </div>

      <div className="movie-list">
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <div
              className="movie-image"
              style={{ backgroundImage: `url(${movie.image})` }}
            ></div>
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

      <div className="movies-h">
        <span >Now Showing</span>
      </div>

      <div className="movie-list">
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <div
              className="movie-image"
              style={{ backgroundImage: `url(${movie.image})` }}
            ></div>
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

      <div className="movies-h">
        <span >Marvel</span>
      </div>

      <div className="movie-list">
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <div
              className="movie-image"
              style={{ backgroundImage: `url(${movie.image})` }}
            ></div>
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
}

export default Movies;
