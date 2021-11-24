import './listItem.scss';
import movie from '../../assets/images/movie.jpg';
import { InfoOutlined, PlayArrow } from '@material-ui/icons';

const ListItem = () => {
  return (
    <div className='listItem'>
      <img src={movie} alt='movie' />
      <div className='itemInfo'>
        <div className='icons'>
          <PlayArrow className='icon' />
          <InfoOutlined className='icon' />
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
