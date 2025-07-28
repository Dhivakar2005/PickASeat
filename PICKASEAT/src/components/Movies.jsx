import { Link } from 'react-router-dom';
import movies from './Movie';
import './../App.css';

const Movies = () => {
  const getRandomUniqueMovies = (moviesArray, count) => {
    const shuffled = [...moviesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const recentlyWatched = getRandomUniqueMovies(movies, 4);
  const suggestions = getRandomUniqueMovies(movies, 4);
  const nowShowing = getRandomUniqueMovies(movies, 4);
  const marvel = getRandomUniqueMovies(movies, 4);

  const renderMovieSection = (title, movieList, sectionKey) => (
    <>
      <div className="movies-h">
        <span>{title}</span>
      </div>
      <div className="movie-list">
        {movieList.map((movie) => (
          <div className="movie-card" key={`${sectionKey}-${movie.id}`}>
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
    <div className='movies-page'>
      
      {renderMovieSection("Recently Watched", recentlyWatched, "recent")}
      {renderMovieSection("Suggestions", suggestions, "suggestion")}
      {renderMovieSection("Now Showing", nowShowing, "now")}
      {renderMovieSection("Marvel", marvel, "marvel")}
    </div>
  );
};

export default Movies;