import React from "react";
import allActions from "../../actions";
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

  const onSpendPoint = (stat) => {
    dispatch(allActions.charActions.spendPoint(stat));
  }

  if (loading) {
    return <Loading width="15em" height="15em" />
  }

  return (
    <div className="container">
      <div className="row justify-content-center mb-3">
        <div className="col-3 me-2 p-3 card">
          <h4><b>{user.name}'s</b> Info:</h4>
          <p className="mb-0">
            <b>Level:</b> {user.character.level}<br/>
            <b>Gold:</b> {user.character.gold}<br/>
            <b>Location:</b> <span style={{textTransform: "capitalize"}}>{user.character.area}</span><br/>
            <b>Damage:</b> {user.character.stats.strength}-{user.character.stats.strength * 2}<br/>
            <b>Health:</b> {user.character.health}/{user.character.stats.vitality * 5}
            <span className="progress" style={{width: "80%", height: "1.2rem"}}>
              <span className="progress-bar" style={{backgroundColor: "green", width: `${(user.character.health / (user.character.stats.vitality * 5)) * 100}%`}}></span>
            </span>
            <b>Experience:</b> {user.character.exp}/{user.character.expMax}
            <span className="progress" style={{width: "80%", height: "1.2rem"}}>
              <span className="progress-bar" style={{backgroundColor: "purple", width: `${(user.character.exp / user.character.expMax) * 100}%`}}></span>
            </span>
          </p>
        </div>
        <div className="col-3 ms-2 p-3 card">
          <h4><b>{user.name}'s</b> Stats:</h4>
            <p>
              <b>Vitality:</b> {user.character.stats.vitality}
              {user.character.stats.points > 0 && <button onClick={() => onSpendPoint("vitality")} className="btn btn-sm btn-outline-secondary" style={{float: "right"}}>+</button>}
            </p>
            <p>
              <b>Strength:</b> {user.character.stats.strength}
              {user.character.stats.points > 0 && <button onClick={() => onSpendPoint("strength")} className="btn btn-sm btn-outline-secondary" style={{float: "right"}}>+</button>}
            </p>
            <p>
              <b>Speed:</b> {user.character.stats.speed}
              {user.character.stats.points > 0 && <button onClick={() => onSpendPoint("speed")} className="btn btn-sm btn-outline-secondary" style={{float: "right"}}>+</button>}
            </p>
            <br/>
            <p className="mb-0"><b>Points Remaining:</b> {user.character.stats.points}</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-2 d-grid text-center">
          <button onClick={findBattle} className="btn btn-main">
            Find Battle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
