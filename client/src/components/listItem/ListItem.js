import './listItem.scss';
import movie from '../../assets/images/movie.jpg';
import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from '@material-ui/icons';

const ListItem = () => {
  return (
    <div className='listItem'>
      <img src={movie} alt='movie' />
      <div className='itemInfo'>
        <div className='icons'>
          <PlayArrow />
          <Add />
          <ThumbUpAltOutlined />
          <ThumbDownOutlined />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
