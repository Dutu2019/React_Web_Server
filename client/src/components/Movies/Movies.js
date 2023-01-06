import "./Movies.css";
import { React, useState, useEffect } from "react";

const Movies = () => {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    fetch("http://10.2.10.51:3001/movies")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovies(data);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const submitForm = () => {
    fetch("http://10.2.10.51:3001/movies/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieName: movieName, movieReview: movieReview }),
    });

    document.querySelector("#movieName").value = "";
    document.querySelector("#movieReview").value = "";
    getMovies();
  };

  return (
    <div className="movies">
      <h1 className="title">Movie Reviews</h1>
      <div className="svg"></div>
      <div className="svg rotate"></div>
      <div className="form">
        <input
          id="movieName"
          type="text"
          name="movieName"
          placeholder="Movie Name"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />

        <input
          id="movieReview"
          type="text"
          name="movieReview"
          placeholder="Movie Review"
          onChange={(e) => {
            setMovieReview(e.target.value);
          }}
        />

        <button onClick={submitForm}>Submit</button>
      </div>
      <div className="movie-container">
        {movies.map((movie) => {
          return (
            <div className="movie-box">
              <h2>Movie</h2>
              <div className="movieName">{movie.movieName}</div>

              <h3>Movie Review</h3>
              <div className="movieReview">{movie.movieReview}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Movies;
