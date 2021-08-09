import { Container, Toolbar } from "@material-ui/core";
import React from "react";
import { Switch, Route } from "react-router-dom";
import "./Details.sass";

export class Details extends React.Component {
  render() {
    return (
      <Container>
        <Toolbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/edu">
            <Edu />
          </Route>
          <Route path="/work">
            <Work />
          </Route>
          <Route path="/certs">
            <Certs />
          </Route>
          <Route path="/skills">
            <Skills />
          </Route>
          <Route path="/interests">
            <Intr />
          </Route>
        </Switch>
      </Container>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Edu() {
  return (
    <div>
      <h2>Education</h2>
    </div>
  );
}

function Work() {
  return (
    <div>
      <h2>Work Experience</h2>
    </div>
  );
}

function Certs() {
  return (
    <div>
      <h2>Certification</h2>
    </div>
  );
}

function Skills() {
  return (
    <div>
      <h2>Skills</h2>
    </div>
  );
}

function Intr() {
  return (
    <div>
      <h2>Interests</h2>
    </div>
  );
}
