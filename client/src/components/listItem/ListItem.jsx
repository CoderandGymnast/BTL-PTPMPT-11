import './listItem.scss';
import movie from '../../assets/images/movie.jpg';
import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const ListItem = () => {
  return (
    <div className='listItem'>
      <Link to='/id'>
        <img src={movie} alt='movie' />
      </Link>
      <div className='itemInfo'>
        <div className='icons'>
          <Link to='/id'>
            <PlayArrow className='icon' />
          </Link>
          <Link to='/id'>
            <InfoOutlined className='icon' />
          </Link>
        </div>
        <div className='itemInfoTop'>
          <span>2 hours 2 mins</span>
          <span className='limit'>10+</span>
          <span className='genre'>Action</span>
        </div>
        <div className='desc'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          velit iure facilis nostrum debitis consequatur
        </div>
      </div>
    </div>
  );
};

export default ListItem;
