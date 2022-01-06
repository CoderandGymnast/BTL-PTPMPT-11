import { useEffect } from 'react';
import { useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';

import getData from '../../api/handleApi/getData';
import genreApi from '../../api/genreApi';

import './home.scss';

const Home = () => {
  const [listGenres, setListGenres] = useState([]);

  useEffect(() => {
    const callback = (res) => {
      if (res.status === 200) {
        setListGenres(res.data);
      }
    };
    setTimeout(() => {
      getData(genreApi.getAll, callback);
    }, 400);
  }, []);

  return (
    <div className='home'>
      <Featured />
      {listGenres &&
        listGenres.map(({ id, name }) => <List name={name} key={id} />)}
    </div>
  );
};

export default Home;
