import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import allActions from "./actions";
import { Provider } from "react-redux";
import buildStore from "./store";
import { PersistGate } from 'redux-persist/integration/react'

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import PageNotFound from "./components/layout/404";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import ScrollToTop from "./components/modules/ScrollToTop";
import { config } from "./utils/configs";

//Importing fontawesome, bootstrap, and custom css
import "./assets/css/fontawesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/App.scss"; //App scss

//Importing jquery and boostrap js
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const { store, persistor } = buildStore();

class App extends Component {
  state = {
    loading: true
  }

  async componentDidMount() {
    if (localStorage.jwtToken) {
      //Check for version mismatch
      if (!localStorage.VERSION || localStorage.VERSION !== config.VERSION) {
        localStorage.removeItem("VERSION");
        store.dispatch(allActions.authActions.logoutUser(persistor));
        window.location.href = "./login";
      }
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        store.dispatch(allActions.authActions.logoutUser(persistor));
        window.location.href = "./login";
      }
    }
    //If the user doesn't have a token, purge persistor just to be safe
    else {
      persistor.purge();
    }
    this.setState({ loading: false });
  }

  render() {
    const loading = this.state.loading;

    if (loading) {
      return (
        <div className="App">
          <div style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, margin: "auto", width: "15em", height: "15em"}} 
          className="preloader-wrapper active">
            <div className="spinner-layer">
              <div className="circle-clipper left">
                <div style={{borderWidth: "12px"}} className="circle"></div>
              </div><div className="gap-patch">
                <div style={{borderWidth: "12px"}} className="circle"></div>
              </div><div className="circle-clipper right">
                <div style={{borderWidth: "12px"}} className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <div className="App">
              <Navbar />
              <ScrollToTop />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/logout" component={Logout} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route path="*" component={PageNotFound} />
              </Switch>
              <Footer />
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
