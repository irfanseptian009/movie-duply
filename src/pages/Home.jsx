import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "../style/Home.scss";
import { LiaImdb } from "react-icons/lia";
import ListMovie from "./../components/ListMovie";
import Upcoming from "./../components/Upcoming";
import TopRated from "./../components/TopRated";
import SearchBar from "./../components/SearchBar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FaLanguage } from "react-icons/fa";
import { MdFavoriteBorder, MdHowToVote } from "react-icons/md";
import { BsCalendar2Date, BsFire } from "react-icons/bs";

export const apiKey = "133defa4ac839757296610c1217e7aee";
export const baseUrl = "https://api.themoviedb.org/3";
export const imgUrl = "https://image.tmdb.org/t/p/w500";

function Home(id) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(movies);
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/movie/now_playing`, {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
    <div className="movies-container">
      <SearchBar />
      <Carousel className="Carousel">
        {movies.map((movie) => (
          <Carousel.Item key={movie.id}>
            {" "}
            <div className="Carousel-item">
              <img
                className="img"
                src={`${imgUrl}${movie.poster_path}`}
                alt={movie.title}
              />

              <Carousel.Caption className="Caption">
                <img
                  className="img2"
                  src={`${imgUrl}${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2 className="Tittle">{movie.title}</h2>
                <p className="description1">
                  <div className="vote">
                    <LiaImdb className="icon1" />
                    <p>
                      <FaLanguage className="icon" /> {movie.original_language}
                    </p>
                    <p>
                      <MdFavoriteBorder className="icon" />
                      {movie.popularity}
                    </p>
                    <p>
                      <BsCalendar2Date className="icon" />
                      {movie.release_date}
                    </p>
                    <p>
                      <BsFire className="icon" />
                      {movie.vote_average}
                    </p>
                    <p>
                      <MdHowToVote className="icon" />
                      {movie.vote_count}
                    </p>
                  </div>
                </p>
                <p className="description">{movie.overview}</p>
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
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <ListMovie />
      <Upcoming />
      <TopRated />
    </div>
  );
}

export default Home;
