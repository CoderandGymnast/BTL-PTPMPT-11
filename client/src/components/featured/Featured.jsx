import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './featured.scss';

import filmInfo from '../../assets/images/eternalsInfo.png';
import filmPoster from '../../assets/images/eternalsPoster.jpeg';
import movieApi from '../../api/movieApi';
import getData from '../../api/handleApi/getData';
import { useState } from 'react';
import { useEffect } from 'react';

const Featured = ({ type }) => {
  const id = 1;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const callback = (res) => {
      if (res.status === 200) {
        setMovie(res.data);
      }
    };

    getData(movieApi.getById, callback, id);
  }, [id]);

  return (
    <div className='featured'>
      {type && (
        <div className='category'>
          <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
          <select name='genre' id='genre'>
            <option value=''>Genre</option>
            <option value='adventure'>Adventure</option>
            <option value='comedy'>Comedy</option>
            <option value='tvshow'>TV show</option>
            <option value='fantasy'>Fantasy</option>
            <option value='historical'>Historical</option>
            <option value='horror'>Horror</option>
            <option value='romance'>Romance</option>
            <option value='drama'>Drama</option>
            <option value='documentary'>Documentary</option>
          </select>
        </div>
      )}

      <img src={filmPoster} alt='featured' />
      <div className='info'>
        <img src={filmInfo} alt='info' />
        <span className='desc'>{movie && movie.description}</span>
        <div className='buttons'>
          <Link to={`${id}`} className='play'>
            <PlayArrow />
            <span>Play</span>
          </Link>
          <Link to={`${id}`} className='more'>
            <InfoOutlined />
            <span>Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
