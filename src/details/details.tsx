import { Container, Toolbar } from "@mui/material";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Certs } from "./content/certificates";
import { Education } from "./content/education";
import { Experience } from "./content/experience";
import { Welcome } from "./content/welcome";
import { Interests } from "./content/interests";
import { Skills } from "./content/skills";
import "./Details.sass";

export class Details extends React.Component {
  render() {
    return (
      <Container>
        <Toolbar />
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/edu">
            <Education />
          </Route>
          <Route path="/exp">
            <Experience />
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
