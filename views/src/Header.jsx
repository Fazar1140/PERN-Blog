import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext, UserContextProvider} from './UserContext'

export default function Header() {
  const {userInfo,setUserInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      credentials: 'include',
    }).then(response => {
      
      response.json().then(userInfo => {
        
        setUserInfo(userInfo.info);
       
    
      });
      
    });
  }, []);

  function logout() {
    fetch('http://localhost:5000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const email = userInfo?.email;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {email && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({email})</a>
          </>
        )}
        {!email && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}