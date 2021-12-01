import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import './featured.scss';

import filmInfo from '../../assets/images/eternalsInfo.png';
import filmPoster from '../../assets/images/eternalsPoster.jpeg';
import { Link } from 'react-router-dom';

const Featured = ({ type }) => {
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
        <span className='desc'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque totam
          pariatur minima modi maiores explicabo facilis itaque! Temporibus
          vitae, corrupti quia adipisci labore nobis ad optio. Officia libero
          temporibus saepe?
        </span>
        <div className='buttons'>
          <Link to='/id' className='play'>
            <PlayArrow />
            <span>Play</span>
          </Link>
          <Link to='/id' className='more'>
            <InfoOutlined />
            <span>Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
