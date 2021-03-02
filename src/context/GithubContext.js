import React, { createContext, useState, useEffect } from 'react';

export const GithubContext = createContext();

export const GithubState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [overview, setOverview] = useState(null);
  const [search, setSearch] = useState('osek0');
  const [error, setError] = useState('');

  const getSearch = e => {
    e.preventDefault();
    getData();
    setSearch('');
  }

  const getData = () => {
    fetch(`https://api.github.com/users/${search}`)
    .then(resp => resp.json())
    .then(data => {
      if(data.message) {
        setUser(null);
        setRepos(null);
        setFollowers(null);
        setOverview(null);
        setError("User not found...");
      } else {
        setUser(data);
        getOverview();
        getRepos();
        getFollowers();
        setError('');
      }
    });
  }

  const getRepos = () => {
    fetch(`https://api.github.com/users/${search}/repos`)
    .then(resp => resp.json())
    .then(data => setRepos(data));
  }

  const getOverview = () => {
    fetch(`https://api.github.com/users/${search}/repos?per_page=8&sort=asc`)
    .then(resp => resp.json())
    .then(data => setOverview(data));
  }

  const getFollowers = () => {
    fetch(`https://api.github.com/users/${search}/followers`)
    .then(resp => resp.json())
    .then(data => setFollowers(data));
  }

  useEffect(() => {
    getData();
    setSearch('');
  }, []);

  return(
    <GithubContext.Provider value={{ getSearch, user, repos, followers, overview, search, setSearch, error }}>
      {children}
    </GithubContext.Provider>
  );
}