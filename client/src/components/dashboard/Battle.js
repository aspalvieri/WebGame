import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import allActions from "../../actions";
import Loading from "../modules/Loading";
import isEmpty from "is-empty";

function Battle() {
  const isInitialMount = useRef(true);
  const fetched = useRef(false);
  const loading = useSelector(state => state.auth.loading);
  const user = useSelector(state => state.auth.user);
  const battle = useSelector(state => state.battle);
  const [prevPlayer, setPrevPlayer] = useState({});
  const [prevEnemy, setPrevEnemy] = useState({});
  const [attacking, setAttacking] = useState(false);
  const [takeDamage, setTakeDamage] = useState([]);
  const [sendDamage, setSendDamage] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    if (!fetched.current && battle && !battle.info) {
      dispatch(allActions.charActions.getBattle());
      fetched.current = true;
    }
  }, [dispatch, battle]);

  useEffect(() => {
    var timer1, timer2;
    if (isEmpty(prevPlayer) || isEmpty(prevEnemy)) {
      setPrevPlayer(battle.player);
      setPrevEnemy(battle.enemy);
    }
    if (battle.takeDamage && battle.sendDamage) {
      if (battle.player !== prevPlayer || battle.enemy !== prevEnemy) {
        //If player attacked first
        if (battle.first === "Player") {
          setPrevEnemy(battle.enemy);
          setSendDamage(state => [<span key={state.length} className="battleText"><b>-{battle.sendDamage}</b></span>, ...state]);
          if (battle.enemy.health > 0) {
            timer1 = setTimeout(() => {
              setPrevPlayer(battle.player);
              setTakeDamage(state => [<span key={state.length} className="battleText"><b>-{battle.takeDamage}</b></span>, ...state]);
            }, 750);
          }
        }
        //If enemy attacked first
        else {
          setPrevPlayer(battle.player);
          setTakeDamage(state => [<span key={state.length} className="battleText"><b>-{battle.takeDamage}</b></span>, ...state]);
          if (battle.player.health > 0) {
            timer1 = setTimeout(() => {
              setPrevEnemy(battle.enemy);
              setSendDamage(state => [<span key={state.length} className="battleText"><b>-{battle.sendDamage}</b></span>, ...state]);
            }, 750);
          }
        }
      }
      timer2 = setTimeout(() => {
        setAttacking(false);
      }, (751));
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [battle, prevPlayer, prevEnemy]);

  const onAttack = e => {
    setAttacking(true);
    dispatch(allActions.charActions.attack());
  }

  if (isInitialMount.current || loading || (isEmpty(battle) && user.character.inBattle)) {
    return <Loading width="15em" height="15em" />
  }
  else if (battle && battle.info && !attacking) {
    return <Redirect to="/battleinfo" />
  }
  else if (!user.character.inBattle && !attacking) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto">
          <div className="row">
            <div className="col-2 mx-auto">
              <b>Name:</b> {prevPlayer.name}<br/>
              <b>Level:</b> {prevPlayer.level}<br/>
              <b>Damage:</b> {prevPlayer.damageMin}-{prevPlayer.damageMax}<br/>
              <b>Health:</b> {prevPlayer.health}/{prevPlayer.maxHealth} {takeDamage[0]}
              <span className="progress" style={{width: "150px"}}>
                <span className="progress-bar bg-success" style={{width: `${(prevPlayer.health / prevPlayer.maxHealth) * 100}%`}}></span>
              </span>
            </div>
            <div className="col-2 mx-auto">
              <b>Name:</b> {battle.enemy.name}<br/>
              <b>Level:</b> {battle.enemy.level}<br/>
              <b>Damage:</b> {battle.enemy.damageMin}-{battle.enemy.damageMax}<br/>
              <b>Health:</b> {prevEnemy.health}/{battle.enemy.maxHealth} {sendDamage[0]}
              <span className="progress" style={{width: "150px"}}>
                <span className="progress-bar bg-success" style={{width: `${(prevEnemy.health / battle.enemy.maxHealth) * 100}%`}}></span>
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
