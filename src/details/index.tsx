import { Container, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { CertificatePage } from "./content/certificates";
import { Education } from "./content/education";
import { Experience } from "./content/experience";
import { Interests } from "./content/interests";
import { Skills } from "./content/skills";
import { Welcome } from "./content/welcome";
import "./index.sass";

export const Details = () => {
  return (
    <Container className="app-container" maxWidth="xl">
      <Toolbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="edu" element={<Education />} />
        <Route path="exp" element={<Experience />} />
        <Route path="certs" element={<CertificatePage />} />
        <Route path="skills" element={<Skills />} />
        <Route path="interests" element={<Interests />} />
      </Routes>
    </Container>
  );
};
