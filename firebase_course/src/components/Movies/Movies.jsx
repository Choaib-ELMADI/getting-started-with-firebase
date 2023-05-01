import { useState } from "react";

import { db } from '../../config/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

import './Movies.css';



const Movies = ({ movieList, getMovieList }) => {
    return (
        <div className='app__movies-list'>
            {
            movieList.length < 1 ? 
            <div style={{ padding: '.5rem 1rem' }}><h1>No Movies To Show</h1></div>
            :
            movieList.map(movie => (
                <Movie 
                    movie={ movie }
                    key={ movie.id }
                    getMovieList={ getMovieList }
                />
            ))
            }
        </div>
    );
};

export default Movies;

const Movie = ({ movie, getMovieList }) => {
    const [updatedTitle, setUpdatedTitle] = useState('');

    const handleDeleteMovie = async (id) => {
        const movieDoc = doc(db, "movies", id);
        try {
          await deleteDoc(movieDoc);
          getMovieList();
        }
        catch(err) {
          console.error(err);
        }
    };
    
    const handleUpdateTitle = async (id) => {
        const movieDoc = doc(db, "movies", id);
        try {
          await updateDoc(movieDoc, { title: updatedTitle });
          getMovieList();
          setUpdatedTitle('');
        }
        catch(err) {
          console.error(err);
        }
    };

    return (
        <div>
            <h2 style={{ color: movie.hasOscar ? 'greenyellow' : 'red' }}>{ movie.title }</h2>
            <p>Date: <b>{ movie.releaseDate }</b></p>
            <button className='delete' onClick={ () => handleDeleteMovie(movie.id) }>X</button>

            <input 
                type="text"
                placeholder='Update title'
                onChange={ (e) => setUpdatedTitle(e.target.value) }
                value={ updatedTitle }
            />
            <button 
                onClick={ () => handleUpdateTitle(movie.id) }
                disabled={ updatedTitle === '' }
            >Update Title</button>
        </div>
    );
};