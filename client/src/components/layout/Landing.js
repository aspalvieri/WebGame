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
      <div className="row valign-wrapper">
        <div className="col s12 center-align">
          <h4>
            <b>MERN</b>: A login/auth app built with the{" "}
            <span style={{ fontFamily: "monospace" }}>MERN</span> stack
          </h4>
          <p className="flow-text grey-text text-darken-1">
            Full-stack app with user authentication via Passport and JWTs, stored in MongoDB
          </p>
          <br />
          <div className="col s6">
            <Link
              to="/register"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </Link>
          </div>
          <div className="col s6">
            <Link
              to="/login"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable teal"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
