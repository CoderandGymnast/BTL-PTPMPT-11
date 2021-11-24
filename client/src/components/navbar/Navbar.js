import { ArrowDropDown, Search, Person } from '@material-ui/icons';
import { useState } from 'react';
import './navbar.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className='container'>
        <div className='left'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/VTV3_logo_2013_final.svg/672px-VTV3_logo_2013_final.svg.png'
            alt='logo'
          />
          <span>Home</span>
          <span>Films</span>
        </div>
        <div className='right'>
          <Search className='icon' />
          <Person />
          <div className='profile'>
            <ArrowDropDown className='icon' />
            <div className='options'>
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
