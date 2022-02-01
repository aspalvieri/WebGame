import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import allActions from "../../actions";

function BattleInfo() {
  const info = useSelector(state => state.battle.info);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(allActions.charActions.clearBattle());
    }
  }, [dispatch])

  const onContinue = e => {
    e.preventDefault();
    setRedirect(true);
  }

  if (!info || redirect) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto text-center">
          <h1><b>Result:</b> {info.result}</h1>
          <b>Gold:</b> {info.result === "Victory" ? `+${info.gold}` : `-${info.gold}`}<br/>
          <b>Experience:</b> {info.result === "Victory" ? `+${info.exp}` : `-${info.exp}`}<br/>
          {info.levelUp && <><b>Leveled up!</b><br/></>}
          <button onClick={onContinue} className="mt-3 btn btn-primary">Continue</button>
        </div>
      </div>
    </div>
  )
}

export default BattleInfo;
