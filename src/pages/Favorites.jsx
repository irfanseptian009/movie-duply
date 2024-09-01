import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../style/Favorite.scss";
import { BsFire } from "react-icons/bs";
import { MdFindInPage } from "react-icons/md";

export const apiKey = "133defa4ac839757296610c1217e7aee";
export const baseUrl = "https://api.themoviedb.org/3";
export const imgUrl = "https://image.tmdb.org/t/p/w500";

function Favorite() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        if (localStorage.getItem("favorite")) {
          const favoriteIds = JSON.parse(localStorage.getItem("favorite"));
          const favoriteMoviesData = await Promise.all(
            favoriteIds.map(async (id) => {
              const response = await axios.get(`${baseUrl}/movie/${id}`, {
                params: {
                  api_key: apiKey,
                },
              });
              return response.data;
            })
          );
          setFavoriteMovies(favoriteMoviesData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== id);
    setFavoriteMovies(updatedFavorites);
    // Update local storage with the new favorites list
    localStorage.setItem(
      "favorite",
      JSON.stringify(updatedFavorites.map((movie) => movie.id))
    );
  };

  return (
    <div className="movie-favorite-container">
      <div className="movie-favorite">
        {favoriteMovies.length === 0 ? (
          <p className="no-fav">
            <MdFindInPage />
            No favorite movies yet. Add some!
          </p>
        ) : (
          favoriteMovies.map((movie) => (
            <div className="cards-fav" key={movie.id}>
              <div className="card-fav">
                <img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="card-body-fav">
                  <p>{movie.title}</p>
                  <p>
                    {" "}
                    <BsFire /> {movie.vote_average}
                  </p>
                  <Button
                    className="secondary"
                    variant="outline-secondary"
                    as={Link}
                    to={"/" + movie.id}
                  >
                    Detail
                  </Button>
                  <Button
                    className="danger"
                    variant="danger"
                    onClick={() => removeFromFavorites(movie.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorite;
