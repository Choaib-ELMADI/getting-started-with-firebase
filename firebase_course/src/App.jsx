import React, { useState, useEffect } from 'react';

import { db } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';

import { Auth, Movies, AddMovie } from './components/index';
import './App.css';



const App = () => {
  const [movieList, setMovieList] = useState([]);

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

  return (
    <div className='app'>
      <Auth />
      <AddMovie getMovieList={ getMovieList } movieListRef={ movieListRef } />
      <Movies movieList={ movieList } getMovieList={ getMovieList } />
    </div>
  );
};

export default App;