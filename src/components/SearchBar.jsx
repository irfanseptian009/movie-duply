import { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [dataMovie, setDataMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setDataMovie(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const PINK = "rgb(132, 101, 255)";
  const BLUE = " rgb(9, 94, 169)";

  // eslint-disable-next-line react/prop-types
  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <button
        type="button"
        style={{ backgroundColor: isCurrentEventKey ? PINK : BLUE }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Card className="toggle">
          <Card.Header>
            <ContextAwareToggle eventKey="1">Search</ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {" "}
              <Form className="form" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder=""
                  className="search"
                  aria-label="Search"
                  controlId="formGroupEmail"
                  value={query}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-success" type="submit" className="button1">
                  Search
                </Button>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <div className="container">
        {error && <p>Error: {error.message}</p>}
        {loading && <h1>Loading...</h1>}
        {!loading && dataMovie && dataMovie.results.length === 0 && (
          <h1>No movie found</h1>
        )}
        {!loading &&
          dataMovie &&
          dataMovie.results.map((movie, idx) => (
            <Col key={idx} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Col>
          ))}
      </div>
    </>
  );
};

export default SearchBar;
