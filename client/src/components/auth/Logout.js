import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import allActions from "../../actions";

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.authActions.logoutUser(null));
  }, [dispatch]);

  return <Redirect to="/login" />;
}

export default Logout;
