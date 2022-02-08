import React from "react";

function Loading(props) {
  const { width, height } = props;
  return (
    <div style={{position: "relative", top: 0, left: 0, right: 0, bottom: 0, margin: "auto", width: width, height: height}}>
      <div className="spinner-border text-secondary" style={{width: "100%", height: "100%"}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
