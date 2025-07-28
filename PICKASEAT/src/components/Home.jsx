import { useState } from 'react';
import { Link } from 'react-router-dom';
import movies from './Movie';
import './../App.css';

const Home = () => {
  const [showMoreRow1, setShowMoreRow1] = useState(false);
  const [showMoreRow2, setShowMoreRow2] = useState(false);
  
  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const shuffled = shuffleArray(movies);
  const row1 = shuffled.slice(0, 4);
  const row1Extra = shuffled.slice(4);
  const row2 = shuffleArray(movies).slice(0, 4);
  const row2Extra = shuffleArray(movies).slice(4);

  const renderMovieRow = (label, movies, extra, showMore, toggleShowMore) => (
    <>
      <div className="heading">
        <span className="vh">{label}</span>
        <button className="visit" onClick={toggleShowMore}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
      <div className="movie-list">
        {[...movies, ...(showMore ? extra : [])].map((movie, index) => (
          <div className="movie-card" key={`${label}-${index}`}>
            <div
              className="movie-image"
              style={{ backgroundImage: `url(${movie.image})` }}
            ></div>
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-info">
              {movie.year} • {movie.genre} • {movie.duration}
            </p>
            <div className="movie-footer">
              <Link to={`/details/${movie.id}`}>
                <button className="buy-button">Buy Tickets</button>
              </Link>
              <div className="rating">⭐ {movie.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="home">
      {/* <Navbar/> */}
      <div className="ban">
        <div className="banner">
          <img className="mlogo" src="/src/assets/marvel.png" alt="Marvel Logo" />
          <h1>
            <span>Guardians</span><br />
            <span>of the Galaxy</span>
          </h1>
          <p>
            Action | Adventure | Sci-Fi &nbsp;
            <img src="/src/assets/calender.png" alt="calendar" /> 2018 &nbsp;
            <img src="/src/assets/clock.png" alt="clock" /> 2h 8m
          </p>
          <p>
            In a post-apocalyptic world where cities ride on wheels and consume each other to survive,
            two people meet in London and try to stop a conspiracy.
          </p>
          <Link to="/booking" state={{
            movieName: 'Guardians of the Galaxy',
            movieImage: '/src/assets/backgroundImage.png',
            selectedDate: new Date().toISOString(),
            theaterName: 'INOX',
            theaterLocation: 'Chennai'
          }}>
            <button className="buy-btn">Book Now →</button>
          </Link>
        </div>
      </div>

      {renderMovieRow('Now Showing', row1, row1Extra, showMoreRow1, () => setShowMoreRow1(!showMoreRow1))}
      {renderMovieRow('Recently Watched', row2, row2Extra, showMoreRow2, () => setShowMoreRow2(!showMoreRow2))}
    </div>
  );
};

export default Home;