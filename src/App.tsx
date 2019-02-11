import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Links from "./components/Links";
import CreateLink from "./components/CreateLink";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={Links} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Login} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
