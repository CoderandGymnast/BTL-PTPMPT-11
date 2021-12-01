import { Route, Switch } from 'react-router-dom';

import Home from '../pages/home/Home';
import Detail from '../pages/detail/Detail';

const Routes = () => {
  return (
    <Switch>
      <Route path='/:id' component={Detail} />
      <Route path='/' exact component={Home} />
    </Switch>
  );
};

export default Routes;
