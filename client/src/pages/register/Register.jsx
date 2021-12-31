import './register.scss';

import { Alert } from '@material-ui/lab';
import { Button, Snackbar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import bg from '../../assets/images/footer-bg.jpg';
import logo from '../../assets/images/logo.png';
import userApi from '../../api/userApi';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      name,
      password,
    };
    try {
      const res = await userApi.register(data);
      if (res.status === 201) {
        history.push('/login');
      }
    } catch (e) {
      setOpen(true);
    }
  };

  return (
    <div className='register' style={{ backgroundImage: `url(${bg})` }}>
      <div className='top'>
        <img src={logo} alt='logo' className='logo' />
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity='error'
          elevation={6}
          variant='filled'
        >
          Something Wrong!!!
        </Alert>
      </Snackbar>

      <div className='container'>
        <form>
          <h1>Register</h1>
          <input
            type='text'
            placeholder='Your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            variant='contained'
            className='button'
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <span>
            Already have an account ? <Link to='login'>Sign in now.</Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Register;
