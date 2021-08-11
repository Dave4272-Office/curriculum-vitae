import { Container, Toolbar } from "@material-ui/core";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Certs } from "./content/certs.component";
import { Education } from "./content/education.component";
import { Home } from "./content/home.component";
import { Interests } from "./content/interests.component";
import { Skills } from "./content/skills.component";
import { Work } from "./content/work.component";
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
            <Education />
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
            <Interests />
          </Route>
        </Switch>
      </Container>
    );
  }
}
