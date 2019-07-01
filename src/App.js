import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Finder from './components/users/Finder';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import PropTypes from 'prop-types';

import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {
  const [alert, setAlert] = useState(null);

  //Alert if text field is null
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  ////////// Componentes renderizados - Parte principal de App.js/////////
  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <React.Fragment>
                    <Finder
                      setAlert={showAlert}
                    />
                    <Users />
                  </React.Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User}/>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

App.propTypes = {
  searchUser: PropTypes.func
};

export default App;
