import React, { useContext } from 'react';
import { GithubContext } from '../context/GithubContext';

const Followers = () => {
  const { followers } = useContext(GithubContext);

  return(
    <>
      {followers && followers.map((follower, index) => (
        <a
          key={index}
          href={follower.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="followersContainer"
        >
          <div className="followers">
            <img src={follower.avatar_url} alt="follower" />
            <p>{follower.login}</p>
          </div>
        </a>
      ))}
    </>
  );
}

export default Followers;