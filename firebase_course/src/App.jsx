import React, { useState, useEffect } from 'react';

import { Auth } from './components/index';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import './App.css';



const App = () => {
  const [movieList, setMovieList] = useState([]);

  const movieListRef = collection(db, "movies");

  useEffect(() => {
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

    getMovieList();
  }, []); 

  return (
    <div className='app'>
      <Auth />
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        {
          movieList.map(movie => (
            <div key={ movie.id }>
              <h2 style={{ color: movie.hasOscar ? 'greenyellow' : 'red' }}>{ movie.title }</h2>
              <p>Date: <b>{ movie.releaseDate }</b></p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default App;