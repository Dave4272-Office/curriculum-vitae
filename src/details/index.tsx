import { Container, Toolbar } from "@mui/material";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Certs } from "./content/certificates";
import { Education } from "./content/education";
import { Experience } from "./content/experience";
import { Welcome } from "./content/welcome";
import { Interests } from "./content/interests";
import { Skills } from "./content/skills";
import "./index.sass";

export class Details extends React.Component {
  render() {
    return (
      <Container className="app-container" maxWidth="xl">
        <Toolbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="edu" element={<Education />} />
          <Route path="exp" element={<Experience />} />
          <Route path="certs" element={<Certs />} />
          <Route path="skills" element={<Skills />} />
          <Route path="interests" element={<Interests />} />
        </Routes>
      </Container>
    );
  }
}
