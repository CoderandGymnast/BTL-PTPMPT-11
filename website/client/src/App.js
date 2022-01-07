import './app.scss';

import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';
import Admin from './pages/admin/Admin';

const App = () => {
  const { token } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/register'>
          {!token ? <Register /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/login'>
          {!token ? <Login /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/admin'>
          <Admin />
        </Route>
        <Route path='/'>
          {token ? (
            <>
              <Navbar />
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/:id' component={Detail} />
              </Switch>
              <Footer />
            </>
          ) : (
            <Redirect to='/register' />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
