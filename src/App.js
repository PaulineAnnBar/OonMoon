import React from 'react';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css'
import Header from "./components/Header";
import "./index.css"
import Container from "./components/Container";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MonthlyLog from './components/MonthlyLog';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
            <p className={"subheader"}>With OonMoon,
              you’re in control.Your personal information belongs to you and no one else!
              So we keep you safe. Access your personalized health insights,how your cycle affects your body and well being
              You can also find here an overview of your monthly log.
            </p>
            <Container />
          </Route>
          <Route path="/Monthly-log" exact>MonthlyView
            <MonthlyLog />
          </Route>
        </Switch>
        <Link to="/Monthly-log">You can view your Monthly log here: </Link>
      </div>

    </Router>
  );
}


