import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, battle, location, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        auth.user.character.inBattle === true && (battle && !battle.info) && location.pathname !== "/battle" ? (
          <Redirect to="/battle" />
        ) : (
        <Component {...props} />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  battle: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  battle: state.battle
});

export default connect(mapStateToProps)(PrivateRoute);