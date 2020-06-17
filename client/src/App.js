import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Alert from './Components/Layout/Alert';
import Dashboard from './Components/Dashboard/Dashboard';
import CreateProfile from './Components/Profile-forms/CreateProfile';
import PrivateRoute from './Components/Routing/PrivateRoute';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';
import { loadUser } from './Redux/actions/auth';
import setAuthToken from './Redux/utils/setAuthToken';

if (localStorage.getItem('token')) {
  // setAuthToken set the x-auth-token to the header with axios, like we do in postman
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            {/* inside Switch we can only have Routes in it */}
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              {/* For PrivateRoute Component I must have Switch */}
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
