import React, { Component } from "react";

class PageNotFound extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1><strong>404:</strong> Page Not Found</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFound;