import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function Landing() {
  const user = useSelector(state => state.auth);

  // If logged in and user navigates to Login page, should redirect them to dashboard
  if (user.isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto text-center">
          <h4>
            <b>Web Game</b>: RPG-style Game
          </h4>
          <p className="flow-text grey-text text-darken-1">
            Made with Nodejs, React, Redux, MongoDB.
          </p>
          <div className="row justify-content-center">
            <div className="col-3">
              <Link to="/register" className="btn btn-lg btn-primary">
                Register
              </Link>
            </div>
            <div className="col-3">
              <Link to="/login" className="btn btn-lg btn-outline-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
