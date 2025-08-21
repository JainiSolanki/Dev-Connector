import './App.css';
import React, { Fragment , useEffect} from 'react';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PropTypes from 'prop-types';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

if(localStorage.token) {
        setAuthToken(localStorage.token);}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Alert/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Fragment>
  </Router>
  </Provider>
) } ;

export default App;
