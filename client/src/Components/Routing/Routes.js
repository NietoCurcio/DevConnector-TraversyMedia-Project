import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import Alert from '../Layout/Alert';
import Dashboard from '../Dashboard/Dashboard';
import CreateProfile from '../Profile-forms/CreateProfile';
import EditProfile from '../Profile-forms/EditProfile';
import AddExperience from '../Profile-forms/AddExperience';
import AddEducation from '../Profile-forms/AddEducation';
import Profiles from '../Profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../Layout/NotFound';
import PrivateRoute from '../Routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      {/* inside Switch we can only have Routes in it */}
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />

        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        {/* For PrivateRoute Component I must have Switch */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
