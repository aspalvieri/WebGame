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
      <div className="row valign-wrapper">
        <div className="col s12 center-align">
          <h4>Character Info</h4>
          <p className="flow-text">
            <b>Name:</b> {user.name}<br/>
            <b>Level:</b> {user.character.level}<br/>
            <b>Health:</b> {user.character.health}/{user.character.maxHealth}
            <span className="progress" style={{width: "20%", minWidth: "150px", maxWidth: "225px", margin: "0 auto", marginTop: "-3px"}}>
              <span className="determinate" style={{width: `${(user.character.health / user.character.maxHealth) * 100}%`}}></span>
            </span>
          </p>
          <p className="flow-text grey-text text-darken-1">
            <small>(version: {config.VERSION})</small>
          </p>
          <button 
            style={{width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem"}}
            onClick={onLogoutClick} 
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
