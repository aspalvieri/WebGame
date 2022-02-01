import React from "react";
import allActions from "../../actions";
import { config } from "../../utils/configs";
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const onLogoutClick = e => {
    e.preventDefault();
    dispatch(allActions.authActions.logoutUser(null));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto">
          <h4>Character Info</h4>
          <p className="flow-text">
            <b>Name:</b> {user.name}<br/>
            <b>Level:</b> {user.character.level}<br/>
            <b>Health:</b> {user.character.health}/{user.character.maxHealth}
            <span className="progress" style={{width: "150px"}}>
              <span className="progress-bar bg-success" style={{width: `${(user.character.health / user.character.maxHealth) * 100}%`}}></span>
            </span>
          </p>
          <p className="text-secondary">
            <small>(version: {config.VERSION})</small>
          </p>
          <button onClick={onLogoutClick} className="btn btn-outline-secondary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
