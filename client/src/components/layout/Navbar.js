import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const auth = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="navigation">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <Link className="nav-link nav-logo" to="/"></Link>
        <Link className="navbar-brand" to="/">Webgame</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav justify-content-start">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          </ul>
          <ul className="navbar-nav justify-content-end">
            {!auth && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
            {!auth && <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>}
            {auth && <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
