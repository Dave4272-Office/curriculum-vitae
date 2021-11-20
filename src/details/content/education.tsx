import { Container, Typography } from "@mui/material";
import { Timeline } from "@mui/lab";
import React from "react";
import { educationCards } from "./items/edu.card";
import "./education.sass";

export class Education extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom className="extra-padded">
          Education
        </Typography>
        <Container className="root-content education-container">
          <Timeline className="edu-card-container">{educationCards}</Timeline>
        </Container>
      </>
    );
  }
}
