import { ArrowDropDown, AccountCircle } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
import './navbar.scss';
import Search from '../search/Search';

import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthActions';

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [name, setName] = useState('');

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem('name'));
    setName(name);
  }, []);

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
          <span className='name'>{name}</span>
          <AccountCircle fontSize='large' />
          <div className='profile'>
            <ArrowDropDown className='icon' />
            <div className='options'>
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
