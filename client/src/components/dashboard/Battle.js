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
          setSendDamage(state => [<b key={state.length} className="battleText">&nbsp;-{battle.sendDamage}</b>, ...state]);
          if (battle.enemy.health > 0) {
            timer1 = setTimeout(() => {
              setPrevPlayer(battle.player);
              setTakeDamage(state => [<b key={state.length} className="battleText">&nbsp;-{battle.takeDamage}</b>, ...state]);
            }, 750);
          }
        }
        //If enemy attacked first
        else {
          setPrevPlayer(battle.player);
          setTakeDamage(state => [<b key={state.length} className="battleText">&nbsp;-{battle.takeDamage}</b>, ...state]);
          if (battle.player.health > 0) {
            timer1 = setTimeout(() => {
              setPrevEnemy(battle.enemy);
              setSendDamage(state => [<b key={state.length} className="battleText">&nbsp;-{battle.sendDamage}</b>, ...state]);
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
          <div className="row justify-content-center mb-3">
            <div className="col-3 me-2 card p-3">
              <h4>{prevPlayer.name}</h4>
              <p className="mb-1"><b>Level:</b> {prevPlayer.level}</p>
              <p className="mb-1"><b>Damage:</b> {prevPlayer.stats.strength}-{prevPlayer.stats.strength * 2}</p>
              <p className="mb-1"><b>Health:</b> {prevPlayer.health}/{prevPlayer.stats.vitality * 5}</p>
              <span className="progress" style={{overflow: "visible", position: "relative", width: "80%", height: "1.2rem"}}>
                <span className="progress-bar" style={{backgroundColor: "green", width: `${(prevPlayer.health / (prevPlayer.stats.vitality * 5)) * 100}%`}}></span>
                <span className="battleSpan" style={{width: `calc(${(prevPlayer.health / (prevPlayer.stats.vitality * 5)) * 100}%)`}}>{takeDamage[0]}</span>
              </span>
            </div>
            <div className="col-3 ms-2 card p-3">
              <h4>{battle.enemy.name}</h4>
              <p className="mb-1"><b>Level:</b> {battle.enemy.level}</p>
              <p className="mb-1"><b>Damage:</b> {battle.enemy.stats.strength}-{battle.enemy.stats.strength * 2}</p>
              <p className="mb-1"><b>Health:</b> {prevEnemy.health}/{battle.enemy.stats.vitality * 5}</p>
              <span className="progress" style={{overflow: "visible", position: "relative", width: "80%", height: "1.2rem"}}>
                <span className="progress-bar" style={{backgroundColor: "green", width: `${(prevEnemy.health / (prevEnemy.stats.vitality * 5)) * 100}%`}}></span>
                <span className="battleSpan" style={{width: `calc(${(prevEnemy.health / (prevEnemy.stats.vitality * 5)) * 100}%)`}}>{sendDamage[0]}</span>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-3 d-grid mx-auto">
              <button onClick={onAttack} disabled={attacking ? true : false} className="btn btn-main">
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
