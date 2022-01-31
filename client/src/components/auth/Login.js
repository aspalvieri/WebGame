import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import queryString from 'query-string';
import allActions from "../../actions";

function Login(props) {
  const history = useHistory();
  const getParams = queryString.parse(props.location.search);

  const user = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);

  const [inputs, setInputs] = useState({});
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [user, history]);

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
      <div className="row valign-wrapper">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          {userRegistered(getParams.registered)}
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                disabled={load ? "disabled" : ""}
                onChange={handleInputChange}
                error={errors.email}
                autoComplete="email"
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                disabled={load ? "disabled" : ""}
                onChange={handleInputChange}
                error={errors.password}
                autoComplete="current-password"
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect
                })}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                disabled={load ? "disabled" : ""}
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
