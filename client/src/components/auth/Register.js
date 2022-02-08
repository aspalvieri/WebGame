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
      <div className="row">
        <div className="col-12 mx-auto text-center">
          <h4>
            <b>Register</b> below
          </h4>
          <p className="grey-text text-darken-1">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <form noValidate onSubmit={onSubmit}>
            <div className="row justify-content-center">
              <div className="col-6 card p-3">
                <div className="col-12 mb-4">
                  <label htmlFor="name" className="form-label my-1"><b>Name</b></label>
                  <input className={classnames("form-control", { "is-invalid": errors.name })}
                    disabled={load ? "disabled" : ""} onChange={handleInputChange}
                    error={errors.name} autoComplete="name" id="name" type="text" />
                  <span className="text-danger"><small>{errors.name}</small></span>
                </div>
                <div className="col-12 mb-4">
                  <label htmlFor="email" className="form-label my-1"><b>Email</b></label>
                  <input className={classnames("form-control", { "is-invalid": errors.email })}
                    disabled={load ? "disabled" : ""} onChange={handleInputChange}
                    error={errors.email} autoComplete="email" id="email" type="email" />
                  <span className="text-danger"><small>{errors.email}</small></span>
                </div>
                <div className="col-12 mb-4">
                  <label htmlFor="password" className="form-label my-1"><b>Password</b></label>
                  <input className={classnames("form-control", { "is-invalid": errors.password })}
                    disabled={load ? "disabled" : ""} onChange={handleInputChange}
                    error={errors.password} autoComplete="current-password" id="password" type="password" />
                  <span className="text-danger"><small>{errors.password}</small></span>
                </div>
                <div className="col-12 mb-4">
                  <label htmlFor="password2" className="form-label my-1"><b>Confirm Password</b></label>
                  <input className={classnames("form-control", { "is-invalid": errors.password2 })}
                    disabled={load ? "disabled" : ""} onChange={handleInputChange}
                    error={errors.password2} autoComplete="new-password" id="password2" type="password" />
                  <span className="text-danger"><small>{errors.password2}</small></span>
                </div>
                <div className="col-6 offset-3 d-grid">
                  <button disabled={load ? "disabled" : ""} type="submit" className="btn btn-main">
                    Sign up
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

export default Register;
