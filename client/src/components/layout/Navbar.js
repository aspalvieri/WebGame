import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
