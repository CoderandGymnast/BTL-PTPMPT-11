import { InfoOutlined, Person, PlayArrow } from '@material-ui/icons';
import './featured.scss';

const Featured = () => {
  return (
    <div className='featured'>
      <img
        src='https://i.pinimg.com/564x/28/3f/54/283f54219ac0a3ba499a73fa1b86a16c.jpg'
        alt=''
      />
      <div className='info'>
        <Person />
      </div>
      <span className='desc'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque totam
        pariatur minima modi maiores explicabo facilis itaque! Temporibus vitae,
        corrupti quia adipisci labore nobis ad optio. Officia libero temporibus
        saepe?
      </span>
      <div className='buttons'>
        <button className='play'>
          <PlayArrow />
          <span>Play</span>
        </button>
        <button className='more'>
          <InfoOutlined />
          <span>Info</span>
        </button>
      </div>
    </div>
  );
};

export default Featured;
