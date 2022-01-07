import './listItem.scss';
import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const ListItem = ({ movie, name }) => {
  const converTime = (time) => {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;

    if (hours >= 2) {
      return hours + ' hours ' + minutes + ' minutes';
    }

    return hours + ' hour ' + minutes + ' minutes';
  };

  return (
    <div className='listItem'>
      <Link to={`${movie.id}`}>
        <img
          src={movie.backdropPath.replace('original', 'w400')}
          onError={() => console.log(movie.id)} //to check broken img from database
          alt='movie img not found'
        />
      </Link>
      <div className='itemInfo'>
        <div className='icons'>
          <Link to={`${movie.id}`}>
            <PlayArrow className='icon' />
          </Link>
          <Link to={`${movie.id}`}>
            <InfoOutlined className='icon' />
          </Link>
        </div>
        <div className='itemInfoTop'>
          <span>{converTime(movie.runtime)}</span>
          <span className='limit'>10+</span>
          <span className='genre'>{name}</span>
        </div>
        <Link className='desc' to={`${movie.id}`}>
          {movie.description.substring(0, 140) + ' ...'}
        </Link>
      </div>
    </div>
  );
};

export default ListItem;
