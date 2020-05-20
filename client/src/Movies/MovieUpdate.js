import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const init = {
        title: '',
        director: '',
        metascore: 0,
        stars: ['1','2','3'],
}

const MovieUpdate = props => {
    const [movie, setMovie] = useState(init)
    const { id } = useParams()
    const { push } = useHistory()

    useEffect(()=> {
        const updatedMovie = props.movieList.find(movie => movie.id == id)
        if(updatedMovie) {
            setMovie(updatedMovie)
        }
    },[id])

    const handleChanges = e => {
        setMovie({
            ...movie,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res.data)
                const newList = props.movieList.map(movie =>{
                    if(movie.id == res.data.id) {
                        return res.data
                    }
                    return movie
                })
                props.setMovieList(newList)
                push(`/`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
        <h1>update movie</h1>
        <form onSubmit={handleSubmit}>
            {/* 
            
              id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
             */}

             <label htmlFor='title'>Title:</label>
             <input type='text'
                    name='title'
                    id='title'
                    value={movie.title}
                    onChange={handleChanges}
            />
             <label htmlFor='director'>Director:</label>
             <input type='text'
                    name='director'
                    id='director'
                    value={movie.director}
                    onChange={handleChanges}
            />
             <label htmlFor='metascore'>MetaScore:</label>
             <input type='text'
                    name='metascore'
                    id='metascore'
                    value={movie.metascore}
                    onChange={handleChanges}
            />
             {/* <label htmlFor='title'>Stars:</label>
             {/*         stars: ['1','2','3'], */}
             {/* {movie.stars.map(star => {
                 return (
                     <input type='text' name='stars' id='stars' value={star} onChange={handleChanges} />
                 )
             })} */} */}
             <button>Submit</button>
        </form>
        </div>

    )
}

export default MovieUpdate