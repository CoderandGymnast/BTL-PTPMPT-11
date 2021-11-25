import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@material-ui/icons';
import { useRef, useState } from 'react';

import ListItem from '../listItem/ListItem';
import './list.scss';

const List = ({ name }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSliderNumber] = useState(0);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;

    if (direction === 'left' && slideNumber > 0) {
      setSliderNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${245 + distance}px)`;
    }
    if (direction === 'right' && slideNumber < 4) {
      setSliderNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-245 + distance}px)`;
    }
  };

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
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </div>
        <ArrowForwardIosOutlined
          className='sliderArrow right'
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
};

export default List;
