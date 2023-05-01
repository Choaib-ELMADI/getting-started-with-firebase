import React, { useState, useEffect } from 'react';

import { Auth } from './components/index';
import { db } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './App.css';



const App = () => {
  const [movieList, setMovieList] = useState([]);

  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState(0);
  const [hasOscar, setHasOscar] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState('');

  const movieListRef = collection(db, "movies");
  const getMovieList = async () => {
    try {
      const data = await getDocs(movieListRef);
      const filteredData = data.docs.map((doc) => (
        { ...doc.data(), id: doc.id }
      ));
      setMovieList(filteredData);
    }
    catch(err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const handleAddMovie = async () => {
    try {
      await addDoc(movieListRef, { title, releaseDate, hasOscar });
      getMovieList();
      setTitle("");
      setReleaseDate(0);
      setHasOscar(false);
    }
    catch(err) {
      console.error(err);
    }
  };

  const handleDeleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
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
    }
    catch(err) {
      console.error(err);
    }
  };

  return (
    <div className='app'>
      <Auth />

      <div className='app__add-movie'>
        <input 
          type="text"
          placeholder='Movie title'
          value={ title }
          onChange={ (e) => setTitle(e.target.value) }
        />
        <input
          type="number"
          placeholder='Release date'
          value={ releaseDate }
          onChange={ (e) => setReleaseDate(Number(e.target.value)) }
        />
        <span>
          <label htmlFor="hasoscar">Has Oscar</label>
          <input
            id='hasoscar'
            type="checkbox"
            checked={ hasOscar }
            onChange={ (e) => setHasOscar(e.target.checked) }
          />
        </span>
        <button 
          onClick={ handleAddMovie }
          disabled={ title === '' || releaseDate === 0 }
        >Add Movie</button>
      </div>

      <div className='app__movies-list'>
        {
          movieList.length < 1 ? 
          <div style={{ padding: '.5rem 1rem' }}><h1>No Movies To Show</h1></div>
          :
          movieList.map(movie => (
            <div key={ movie.id }>
              <h2 style={{ color: movie.hasOscar ? 'greenyellow' : 'red' }}>{ movie.title }</h2>
              <p>Date: <b>{ movie.releaseDate }</b></p>
              <button className='delete' onClick={ () => handleDeleteMovie(movie.id) }>X</button>

              <input 
                type="text"
                placeholder='Update title'
                onChange={ (e) => setUpdatedTitle(e.target.value) }
              />
              <button onClick={ () => handleUpdateTitle(movie.id) }>Update Title</button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default App;