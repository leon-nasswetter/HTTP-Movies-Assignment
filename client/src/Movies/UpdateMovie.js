import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

const initialMovie = {
    title: "",
    director: "",
    metascore: null,
    
}

const UpdateMovie = props => {
    const [ movie, setMovie ] = useState(initialMovie)
    const { movieList, setMovieList } = props

    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then( res => {
                setMovie(res.data);
            })
            .catch( err => console.log( err ) );
    }, [])

    const handleChange = e => {
        e.persist();
        setMovie({
          ...movie,
          [e.target.name]: e.target.value
        });
      };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then((res) => {
                setMovieList([ ...movieList, res.data])
                push(`/movies/${id}`)
            })
            .catch((err) => console.log(err))
        
    }

    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <label>Title
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Title"
                        value={movie.title}
                    />
                </label>
                <label>Director
                    <input
                        type="text"
                        name="director"
                        onChange={handleChange}
                        placeholder="Director"
                        value={movie.director}
                    />
                </label>
                <label>Metascore
                    <input
                        type="number"
                        name="metascore"
                        onChange={handleChange}
                        placeholder="Metascore"
                        value={movie.metascore}
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}



export default UpdateMovie;