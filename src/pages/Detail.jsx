import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/Detail.scss";
import { BsFire, BsFillCalendarMonthFill } from "react-icons/bs";
import { AiTwotoneNotification } from "react-icons/ai";

export default function Detail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const responseJson = await response.json();
        setData(responseJson);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="containers">
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div className="detail-container">
          <div className="detail-content">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.original_title}
              onError={(e) => {
                e.target.src = "fallback-image-url";
              }}
            />

            <div className="details">
              <h1>{data.original_title}</h1>
              <p className="genres">
                Genres: {data.genres && data.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="overview">{data.overview}</p>

              <div className="additional-details">
                <p>
                  <BsFillCalendarMonthFill /> {data.release_date}
                </p>
                <p>
                  <BsFire /> {data.vote_average}
                </p>
                <p>
                  <AiTwotoneNotification /> {data.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
}
