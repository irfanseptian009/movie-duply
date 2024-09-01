import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "../style/MovieCard.scss";

export const apiKey = "133defa4ac839757296610c1217e7aee";
export const baseUrl = "https://api.themoviedb.org/3";
export const imgUrl = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/movie`, {
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
  }, []);

  function handleFavorite(id) {
    if (localStorage.getItem("favorite")) {
      let favorite = JSON.parse(localStorage.getItem("favorite"));
      const favoriteIndex = favorite.findIndex((el) => el === id);
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
      <div className="cards">
        <div className="card">
          <img variant="top" src={`${imgUrl}${movie.poster_path}`} alt={movie.title} />
          <div className="card-body">
            <p>{movie.title}</p>
            <p>{movie.vote_average}</p>
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
              variant="danger"
              onClick={() => handleFavorite(movie.id)}
            >
              Favorite
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
