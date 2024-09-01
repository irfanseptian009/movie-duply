import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "../style/MovieCard.scss";

function MovieCard({ movie }) {
  const [setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie`, {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
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
  }, [setMovies]);

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
          <img
            src={`${import.meta.env.VITE_BASE_IMG_URL}${movie.poster_path}`}
            alt={movie.title}
          />
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
