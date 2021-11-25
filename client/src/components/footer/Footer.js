import React from 'react';

import './footer.scss';

import bg from '../../assets/images/footer-bg.jpg';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  return (
    <div className='footer' style={{ backgroundImage: `url(${bg})` }}>
      <div className='content'>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>
        <div className='menus'>
          <div className='menu'>
            <a href='/'>Home</a>
            <a href='/'>Contact us</a>
            <a href='/'>Term of services</a>
            <a href='/'>About us</a>
          </div>
          <div className='menu'>
            <a href='/'>Live</a>
            <a href='/'>FAQ</a>
            <a href='/'>Premium</a>
            <a href='/'>Privacy Policy</a>
          </div>
          <div className='menu'>
            <a href='/'>You must watch</a>
            <a href='/'>Recent release</a>
            <a href='/'>Top IMDP</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
