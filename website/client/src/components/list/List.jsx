import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import genreApi from '../../api/genreApi';
import getData from '../../api/handleApi/getData';

import './list.scss';
import ListItem from '../listItem/ListItem';

const List = ({ name }) => {
  const [movies, setMovies] = useState([]);

  const settings = {
    speed: 500,
    slidesToShow: 7.4,
    slidesToScroll: 6,
    dots: false,
    infinite: false,
    lazyload: true,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 6.4,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5.4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
    ],
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
        <Slider {...settings} className='container'>
          {movies &&
            movies.map((movie) => (
              <ListItem key={movie.id} movie={movie} name={name} />
            ))}
          <div className='lassItem'></div>
        </Slider>
      </div>
    </div>
  );
};

export default List;
