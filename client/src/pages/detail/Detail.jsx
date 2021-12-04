import { useHistory } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';

import banner from '../../assets/images/detail_img.jpg';
import poster from '../../assets/images/detail_img_info.jpg';

import './detail.scss';

import CastList from './CastList';
import VideoList from './VideoList';

const Detail = () => {
  const history = useHistory();
  window.scrollTo(0, 0);

  return (
    <div className='detail'>
      <div className='back'>
        <ArrowBack className='back__item' onClick={() => history.goBack()} />
      </div>
      <div
        className='banner'
        style={{ backgroundImage: `url(${banner})` }}
      ></div>
      <div className='movie-content'>
        <div className='poster'>
          <div
            className='poster__img'
            style={{ backgroundImage: `url(${poster})` }}
          ></div>
        </div>
        <div className='info'>
          <h1 className='title'>Red Notice</h1>
          <div className='genres'>
            <span className='genres__item'>Action</span>
            <span className='genres__item'>Comedy</span>
            <span className='genres__item'>Adventure</span>
          </div>
          <p className='overview'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            doloremque veritatis, doloribus fugiat accusantium velit aliquid
            quas quis iusto, itaque minus optio facere ad molestiae perspiciatis
            libero nam similique ea? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptates soluta laudantium autem distinctio
            ipsum molestias sed praesentium corporis tempore quam repellat,
            aspernatur impedit dignissimos voluptate blanditiis. Error ad
            perferendis facilis.
          </p>
          <div className='cast'>
            <div className='cast__header'>
              <h2>Casts</h2>
            </div>
            <CastList />
          </div>
        </div>
      </div>
      <div className='videoList'>
        <VideoList />
      </div>
    </div>
  );
};

export default Detail;
