import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initMovie = {
    title: "",
    director: "",
    metascore: '',
    stars: []
}

const NewMovie =  props => {
    const [ movie, setMovie ] = useState( initMovie );
    const { push } = useHistory();
    const { setMovieList } = props;

    const handleChange = e => {
        e.persist();
        if( e.target.name === "metascore"){
            e.target.value = parseInt( e.target.value, 10 );
        }
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newMovie = {
            ...movie,
            stars: movie.stars.split(', ')
        }
        axios.post("http://localhost:5000/api/movies", newMovie)
            .then(res => {
                setMovieList(res.data)
                push("/");
            })
    }
  return(
    <div>
        <h2>Add Movie</h2>
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
                <label>Stars
                    <input
                        type="text"
                        name="stars"
                        onChange={handleChange}
                        placeholder="stars"
                        value={movie.stars}
                    />
                    <p>Stars Format: Star Name, next Start name, and so on, </p>
                </label>
                <button>Submit</button>
            </form>
    </div>
  );
}

export default NewMovie;