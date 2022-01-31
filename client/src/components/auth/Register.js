import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import allActions from "../../actions";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);

  const [inputs, setInputs] = useState({});
  const [load, setLoad] = useState("");

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
  }

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      password2: inputs.password2
    };
    setLoad(true);
    dispatch(allActions.authActions.registerUser(newUser, history));
  };

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
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                disabled={load ? "disabled" : ""}
                onChange={handleInputChange}
                error={errors.name}
                autoComplete="name"
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name
                })}
              />
              <label htmlFor="name">Name</label>
              <span className="red-text">{errors.name}</span>
            </div>
            <div className="input-field col s12">
              <input
                disabled={load ? "disabled" : ""}
                onChange={handleInputChange}
                error={errors.email}
                autoComplete="email"
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email
                })}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{errors.email}</span>
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
                  invalid: errors.password
                })}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{errors.password}</span>
            </div>
            <div className="input-field col s12">
              <input
                disabled={load ? "disabled" : ""}
                onChange={handleInputChange}
                error={errors.password2}
                autoComplete="new-password"
                id="password2"
                type="password"
                className={classnames("", {
                  invalid: errors.password2
                })}
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className="red-text">{errors.password2}</span>
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
