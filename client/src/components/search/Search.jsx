import { Search as SearchM, Clear } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import movieApi from '../../api/movieApi';
import getData from '../../api/handleApi/getData';
import './search.scss';

const Search = () => {
  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const callback = (res) => {
      if (res.status === 200) {
        setMovies(res.data);
      }
    };

    getData(movieApi.getByName, callback, title);
  }, [title]);

  return (
    <div className='search-box'>
      <SearchM className='btn-search' />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type='text'
        className='input-search'
        placeholder='Type to Search...'
      />
      {title && <Clear className='btn-clear' onClick={() => setTitle('')} />}
      <ul className='list-movie'>
        {movies &&
          movies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={`${movie.id}`}
                className='movie'
                onClick={() => setTitle('')}
              >
                <img src={movie.posterPath} alt='' className='img-movie' />
                <span className='title-movie'>{movie.title}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
