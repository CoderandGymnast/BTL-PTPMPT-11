import Featured from '../../components/featured/Featured';
import Navbar from '../../components/navbar/Navbar';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <img
        width='100%'
        src='https://znews-photo.zadn.vn/w1920/Uploaded/fsmyi/2021_11_06/Eternals_Payoff_1_Sheet_v6_Lg.0.jpg'
        alt='logo'
      />
      <Featured />
    </div>
  );
};

export default Home;
