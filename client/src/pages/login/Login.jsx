import './login.scss';
import { Button, Snackbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Alert } from '@material-ui/lab';

import bg from '../../assets/images/footer-bg.jpg';
import logo from '../../assets/images/logo.png';
import { AuthContext } from '../../authContext/AuthContext';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '../../authContext/AuthActions';
import userApi from '../../api/userApi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);

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
      password,
    };

    dispatch(loginStart());
    try {
      const res = await userApi.login(data);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      setOpen(true);
      dispatch(loginFailure());
    }
  };

  return (
    <div className='login' style={{ backgroundImage: `url(${bg})` }}>
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
          <h1>Sign In</h1>
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
            Sign In
          </Button>
          <span>
            New to XXX ? <Link to='register'>Sign up now.</Link>
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

export default Login;
