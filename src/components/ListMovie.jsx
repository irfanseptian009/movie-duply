import { useState, useEffect } from "react";
import axios from "axios";
import "../style/ListMovie.scss";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import swal from "sweetalert";
export const apiKey = "133defa4ac839757296610c1217e7aee";
export const baseUrl = "https://api.themoviedb.org/3";
export const imgUrl = "https://image.tmdb.org/t/p/w500";

function ListMovie() {
  const [movies, setMovies] = useState([]);
  const [setIsLoading] = useState(true);
  const [setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/movie/popular`, {
          params: {
            api_key: apiKey,
          },
        });
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [setError, setIsLoading]);

  function handleFavorite(id) {
    if (localStorage.getItem("favorite")) {
      let favorite = JSON.parse(localStorage.getItem("favorite"));
      const favoriteIndex = favorite.findIndex((el) => {
        return el === id;
      });
      if (favoriteIndex === -1) {
        favorite.push(id);
        localStorage.setItem("favorite", JSON.stringify(favorite));
      } else {
        swal.fire({
          title: "Error!",
          text: "You've already favorited this movie",
          icon: "error",
          confirmButtonText: "Alright",
        });
        console.log("sudah pernah di favoritkan");
      }
    } else {
      localStorage.setItem("favorite", JSON.stringify([id]));
    }
  }
  return (
    <>
      <p className="popular">POPULAR</p>
      <div className="movie-list-container">
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie?.id} className="movie-card">
              <img
                src={`${imgUrl}${movie.poster_path}`}
                alt={movie.title}
                className="movie-image"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <Button
                  className="button-secondary"
                  variant="outline-secondary"
                  as={Link}
                  to={"/" + movie.id}
                >
                  Detail
                </Button>
                <Button
                  className="button-warning"
                  variant="primary"
                  onClick={() => handleFavorite(movie.id)}
                >
                  {"Favorite"}
                </Button>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListMovie;
