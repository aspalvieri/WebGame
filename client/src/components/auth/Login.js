import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import queryString from 'query-string';
import allActions from "../../actions";

function Login(props) {
  const getParams = queryString.parse(props.location.search);

  const user = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);

  const [inputs, setInputs] = useState({});
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  
  useEffect(() => {
    setLoad(false);
  }, [errors]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInputs(inputs => {
      return {
        ...inputs,
        [id]: value
      };
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: inputs.email,
      password: inputs.password
    };
    setLoad(true);
    dispatch(allActions.authActions.loginUser(userData));
  };

  const userRegistered = (registered) => {
    if (registered === "true")
      return (
        <h5 style={{ padding: "10px", borderRadius: "5px", textAlign: "center" }}
        className="green accent-2 z-depth-2">
          Your account has been successfully created.
        </h5>
      )
    else
      return (null);
  }

  // If logged in and user navigates to Login page, should redirect them to dashboard
  if (user.isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto text-center">
          {userRegistered(getParams.registered)}
          <h4>
            <b>Login</b> below
          </h4>
          <p className="grey-text text-darken-1">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <form noValidate onSubmit={onSubmit}>
            <div className="row justify-content-center">
              <div className="col-6 card p-3">
                <div className="col-12 mb-4-5 home-input-form">
                  <label htmlFor="email" className="form-label my-1"><b>Email</b></label>
                  <input className={classnames("form-control", { "is-invalid": errors.email || errors.emailnotfound })}
                    disabled={load ? "disabled" : ""} onChange={handleInputChange} 
                    error={errors.email} autoComplete="email" id="email" type="email" />
                  <span className="text-danger home-input-error"><small>{errors.email}{errors.emailnotfound}</small></span>
                </div>
                <div className="col-12 mb-5 home-input-form">
                  <label htmlFor="password" className="form-label my-1"><b>Password</b></label>
                  <input className={classnames("form-control", { "is-invalid": errors.password || errors.passwordincorrect })}
                    disabled={load ? "disabled" : ""} onChange={handleInputChange}
                    error={errors.password} autoComplete="current-password" id="password" type="password" />
                  <span className="text-danger home-input-error"><small>{errors.password}{errors.passwordincorrect}</small></span>
                </div>
                <div className="col-6 offset-3 d-grid">
                  <button disabled={load ? "disabled" : ""} type="submit" className="btn btn-main">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
