import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import allActions from "../../actions";
import Loading from "../modules/Loading";

function Battle() {
  const isInitialMount = useRef(true);
  const fetched = useRef(false);
  const loading = useSelector(state => state.auth.loading);
  const user = useSelector(state => state.auth.user);
  const battle = useSelector(state => state.battle);
  const [attacking, setAttacking] = useState(false);
  const [takeDamage, setTakeDamage] = useState([]);
  const [sendDamage, setSendDamage] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
    if (!fetched.current && battle && !battle.info) {
      dispatch(allActions.charActions.getBattle());
      fetched.current = true;
    }
  }, [dispatch, battle]);

  useEffect(() => {
    setAttacking(false);
    if (battle.takeDamage) {
      setTakeDamage(state => [<span key={state.length} className="battleText"><b>-{battle.takeDamage}</b></span>, ...state]);
    }
    if (battle.sendDamage) {
      setSendDamage(state => [<span key={state.length} className="battleText"><b>-{battle.sendDamage}</b></span>, ...state]);
    }
  }, [battle]);

  const onAttack = e => {
    setAttacking(true);
    dispatch(allActions.charActions.attack());
  }

  if (isInitialMount.current || loading) {
    return <Loading width="15em" height="15em" />
  }
  else if (battle && battle.info) {
    return <Redirect to="/battleinfo" />
  }
  else if (!user.character.inBattle) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto">
          <div className="row">
            <div className="col-2 mx-auto">
              <b>Name:</b> {battle.player.name}<br/>
              <b>Level:</b> {battle.player.level}<br/>
              <b>Damage:</b> {battle.player.damageMin}-{battle.player.damageMax}<br/>
              <b>Health:</b> {battle.player.health}/{battle.player.maxHealth} {takeDamage[0]}
              <span className="progress" style={{width: "150px"}}>
                <span className="progress-bar bg-success" style={{width: `${(battle.player.health / battle.player.maxHealth) * 100}%`}}></span>
              </span>
            </div>
            <div className="col-2 mx-auto">
              <b>Name:</b> {battle.enemy.name}<br/>
              <b>Level:</b> {battle.enemy.level}<br/>
              <b>Damage:</b> {battle.enemy.damageMin}-{battle.enemy.damageMax}<br/>
              <b>Health:</b> {battle.enemy.health}/{battle.enemy.maxHealth} {sendDamage[0]}
              <span className="progress" style={{width: "150px"}}>
                <span className="progress-bar bg-success" style={{width: `${(battle.enemy.health / battle.enemy.maxHealth) * 100}%`}}></span>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-3 d-grid mx-auto">
              <button onClick={onAttack} disabled={attacking ? true : false} className="btn btn-primary">
                Attack
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Battle;
