import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './detail.scss';

import getData from '../../api/handleApi/getData';
import CastList from './CastList';
import VideoList from './VideoList';
import movieApi from '../../api/movieApi';
import Rating from './Rating';

const Detail = () => {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);

  const history = useHistory();
  const { id } = useParams();
  window.scrollTo(0, 0);

  useEffect(() => {
    const callback = (res) => {
      if (res.status === 200) {
        setMovie(res.data);
        setGenres(res.data.genres);
      }
    };

    getData(movieApi.getById, callback, id);
  }, [id]);

  return (
    movie && (
      <div className='detail'>
        <div className='back'>
          <ArrowBack className='back__item' onClick={() => history.goBack()} />
        </div>
        <div
          className='banner'
          style={{ backgroundImage: `url(${movie.backdropPath})` }}
        ></div>
        <div className='movie-content'>
          <div className='poster'>
            <div
              className='poster__img'
              style={{ backgroundImage: `url(${movie.posterPath})` }}
            ></div>
          </div>
          <div className='info'>
            <h1 className='title'>{movie.title}</h1>
            {movie.id ? <Rating id={movie.id} /> : ''}
            <div className='genres'>
              {genres &&
                genres.map((genre) => (
                  <span key={genre.id} className='genres__item'>
                    {genre.name}
                  </span>
                ))}
            </div>
            <p className='overview'>{movie.description}</p>
            <div className='cast'>
              <div className='cast__header'>
                <h2>Casts</h2>
              </div>
              <CastList casts={movie.casts} />
            </div>
          </div>
        </div>
        <div className='videoList'>
          <VideoList videos={movie.videos} />
        </div>
      </div>
    )
  );
};

export default Detail;
