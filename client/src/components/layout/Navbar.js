import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const auth = useSelector(state => state.auth.isAuthenticated);
  
  const homePaths = ["/", "/dashboard", "/battle", "/battleinfo"];

  return (
    <div className="navigation">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <Link className="nav-link nav-logo" to="/"></Link>
        <Link className="navbar-brand" to="/">Web Game</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav justify-content-start">
            <li className="nav-item"><NavLink className="nav-link" to="/" isActive={(match, location) => {
              if (homePaths.includes(location.pathname)) {
                return true;
              }
              return false;
            }} activeClassName="nav-link-active">Home</NavLink></li>
          </ul>
          <ul className="navbar-nav justify-content-end">
            {!auth && <li className="nav-item"><NavLink className="nav-link" to="/login" exact activeClassName="nav-link-active">Login</NavLink></li>}
            {!auth && <li className="nav-item"><NavLink className="nav-link" to="/register" exact activeClassName="nav-link-active">Register</NavLink></li>}
            {auth && <li className="nav-item"><NavLink className="nav-link" to="/logout" exact activeClassName="nav-link-active">Logout</NavLink></li>}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
