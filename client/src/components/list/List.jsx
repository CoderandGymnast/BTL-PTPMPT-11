import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@material-ui/icons';
import { useRef, useState, useEffect } from 'react';
import genreApi from '../../api/genreApi';
import getData from '../../api/handleApi/getData';

import ListItem from '../listItem/ListItem';
import './list.scss';

const List = ({ name }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSliderNumber] = useState(0);
  const [movies, setMovies] = useState([]);

  const listRef = useRef();

  const handleClick = (direction, max = 10) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;

    if (direction === 'left' && slideNumber > 0) {
      setSliderNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${245 + distance}px)`;
    }
    if (direction === 'right' && slideNumber < max - 7) {
      setSliderNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-245 + distance}px)`;
    }
  };

  useEffect(() => {
    const callback = (res) => {
      if (res.status === 200) {
        setMovies(res.data);
      }
    };

    getData(genreApi.getByGenre, callback, name);
  }, [name]);

  return (
    <div className='list'>
      <span className='listTitle'>{name}</span>
      <div className='wrapper'>
        <ArrowBackIosOutlined
          className='sliderArrow left'
          onClick={() => handleClick('left')}
          style={{ display: !isMoved && 'none' }}
        />
        <div className='container' ref={listRef}>
          {movies &&
            movies
              // .slice(0, 10)
              .map((movie) => (
                <ListItem key={movie.id} movie={movie} name={name} />
              ))}
        </div>
        <ArrowForwardIosOutlined
          className='sliderArrow right'
          onClick={movies ? () => handleClick('right', movies.length) : null}
        />
      </div>
    </div>
  );
};

export default List;
