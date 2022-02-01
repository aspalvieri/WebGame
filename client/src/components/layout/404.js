import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto text-center">
          <h2><b>404:</b> Page Not Found</h2>
          <Link to="/" className="btn btn-light">
            <i className="fas fa-arrow-left"></i> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;