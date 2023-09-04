import React, { useEffect, useState } from "react";
import "./style.css"; // CSS file
const apiKey = process.env.REACT_APP_API_KEY;


function App() {
  // State variables for movie data
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  

  // Movie API URLs
  const movieApiUrls = {
    Popular:
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`,
    Search:
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`,
  };

  // Fetch movie data
  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle movie search
  const handleMovieSearch = () => {
    if (searchTerm.trim() === "") {
      // If the search input is empty, redirect to the popular movies URL
      fetchMovies(movieApiUrls.Popular);
    } else {
      const searchUrl = `${movieApiUrls.Search}${searchTerm}`;
      fetchMovies(searchUrl);
    }
  };

  // Initial fetch of popular movies
  useEffect(() => {
    fetchMovies(movieApiUrls.Popular);
  }, []);

  // Function to clear the placeholder text when the input is focused
  function clearPlaceholder(input) {
    input.placeholder = "";
  }

  // Function to restore the placeholder text when the input is blurred and empty
  function restorePlaceholder(input) {
    if (!input.value) {
      input.placeholder = "Search Movies...";
    }
  }

  // Function to assign color to the vote average based on the rating value
  function getVoteAverageColor(voteAverage) {
    if (voteAverage >= 8) {
      return "green";
    } else if (voteAverage >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  return (
    <div>
      <header>
        <button className="glowing-btn">
          <span className="glowing-txt">
            P<span className="faulty-letter">R</span>AM
            <span className="faulty-letter">O</span>D'S
          </span>
          <span className="glowing-txt">
            M<span className="faulty-letter">O</span>VIE
          </span>
          <span className="glowing-txt">
            W<span className="faulty-letter">O</span>R
            <span className="faulty-letter">L</span>D
          </span>
        </button>
      </header>

      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <button onClick={() => fetchMovies(movieApiUrls.Popular)}>
              Popular Movies
            </button>
          </li>
        </ul>

        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Search Movies..."
            onFocus={(e) => clearPlaceholder(e.target)}
            onBlur={(e) => restorePlaceholder(e.target)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleMovieSearch}>
            Search
          </button>
        </div>
      </nav>

      <main>
        <div className="container" id="news-container">
          {movies.map((movie, index) => (
            <div key={index} className="movie-card">
              <img
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
              <div className="movie-content">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-description">{movie.overview}</p>
                <div className="movie-details">
                  <p className="movie-source">
                    Release Date: {movie.release_date}
                  </p>
                  <p
                    className={`movie-vote-average ${getVoteAverageColor(
                      movie.vote_average
                    )}`}
                  >
                    Vote Average: {movie.vote_average}
                  </p>
                  <a
                    className="read-more-link"
                    href={`https://www.themoviedb.org/movie/${movie.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <div className="footer-content">
          <p>&copy; 2023 Pramod Movie World</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
