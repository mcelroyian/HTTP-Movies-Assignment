import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieUpdate from "./MovieUpdate";

function Movie({ addToSavedList, updateMovie, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    e.preventDefault()
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log(res.data)
        const newList = movieList.filter(movie => movie.id !== res.data)
        setMovieList(newList)
        push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }



  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="save-button edit-button" onClick={()=> push(`/update-movie/${movie.id}`)}>
        Edit
      </div>
      <div className="save-button delete-button" onClick={deleteMovie}>
       Delete
      </div>
    </div>
  );
}

export default Movie;
