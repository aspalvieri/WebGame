import React from "react";
import allActions from "../../actions";
import { config } from "../../utils/configs";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../modules/Loading";

function Dashboard() {
  const loading = useSelector(state => state.auth.loading);
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const findBattle = e => {
    e.preventDefault();
    dispatch(allActions.charActions.findBattle());
  };

  if (loading) {
    return <Loading width="15em" height="15em" />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto">
          <h4>Character Info</h4>
          <p className="flow-text">
            <b>Name:</b> {user.name}<br/>
            <b>Level:</b> {user.character.level}<br/>
            <b>Gold:</b> {user.character.gold}<br/>
            <b>Damage:</b> {user.character.damageMin}-{user.character.damageMax}<br/>
            <b>Speed:</b> {user.character.speed}<br/>
            <b>Health:</b> {user.character.health}/{user.character.maxHealth}
            <span className="progress" style={{width: "150px"}}>
              <span className="progress-bar bg-success" style={{width: `${(user.character.health / user.character.maxHealth) * 100}%`}}></span>
            </span>
            <b>Experience:</b> {user.character.exp}/{user.character.expMax}
            <span className="progress" style={{width: "150px"}}>
              <span className="progress-bar" style={{backgroundColor: "purple", width: `${(user.character.exp / user.character.expMax) * 100}%`}}></span>
            </span>
          </p>
          <button onClick={findBattle} className="btn btn-outline-primary">
            Find Battle
          </button>
          <p className="text-secondary">
            <small>(version: {config.VERSION})</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
