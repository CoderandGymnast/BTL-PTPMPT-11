import './app.scss';

import { Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Routes from './config/Routes';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Route
        render={() => (
          <>
            <Navbar />
            <Routes />
            <Footer />
          </>
        )}
      />
    </BrowserRouter>
  );
};

export default App;
