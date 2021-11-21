import { Container, Typography } from "@mui/material";
import { Timeline } from "@mui/lab";
import React from "react";
import { workCards } from "./items/work.card";
import "./experience.sass";

export class Experience extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom className="extra-padded title">
          Experience
        </Typography>
        <Container className="root-content experience-container">
          <Timeline className="work-card-container">{workCards}</Timeline>
        </Container>
      </>
    );
  }
}
