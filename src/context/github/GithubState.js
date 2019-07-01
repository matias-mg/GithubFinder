import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types'

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async user => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id${
      process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  };

  // Get users

  // Get repos

  // Clear users

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING});

  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      alert: state.alert,
      searchUsers
    }}
  >
    {props.children}
  </GithubContext.Provider>
}

export default GithubState;