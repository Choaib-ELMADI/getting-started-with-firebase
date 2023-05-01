import { useState } from 'react';

import { addDoc } from 'firebase/firestore';

import './AddMovie.css';



const AddMovie = ({ getMovieList, movieListRef }) => {
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState(0);
    const [hasOscar, setHasOscar] = useState(false);

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

    return (
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
    );
};

export default AddMovie;