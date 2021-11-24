import Featured from '../../components/featured/Featured';
import Navbar from '../../components/navbar/Navbar';
import List from '../../components/list/List';

import './home.scss';

const listName = [
  'Maybe you like it',
  'Adventure',
  'Comedy',
  'TV show',
  'Fantasy',
  'Historical',
  'Horror',
  'Romance',
  'Drama',
  'Documentary',
];

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Featured />
      {listName && listName.map((name) => <List name={name} key={name} />)}
    </div>
  );
};

export default Home;
