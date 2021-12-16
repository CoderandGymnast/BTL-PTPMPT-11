import { ArrowDropDown, Person } from '@material-ui/icons';
import { useState } from 'react';
import './navbar.scss';
import Search from '../search/Search';

import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

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
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
          <Link to='/'>Home</Link>
          <Link to='/'>Films</Link>
        </div>
        <div className='right'>
          <Search />
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
