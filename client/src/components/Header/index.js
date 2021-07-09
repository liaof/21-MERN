import React from 'react';
import Auth from '../../utils/auth';

// the Link componenet will change the URL
import { Link } from 'react-router-dom';

const logout = event => {
  event.preventDefault();
  Auth.logout();
};

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Deep Thoughts</h1>
        </Link>

        <nav className="text-center">
          {/* when a page renders the <Header> componenet, check if the user is logged in and return the profile link if yes, and the login/signup links if not */}
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>{/* run the logout() function to logout and return to main page */}
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
// in the real DOM seen via Chrome DevTools, <Link/> becomes <a/>. This is because we only need to change the route endpoints
// so the page does not refresh except for the new component being rendered, done via the switch in App.js
// however we use <Link> in the virtual dom because we do not want the page to refresh when we press the links

export default Header;
