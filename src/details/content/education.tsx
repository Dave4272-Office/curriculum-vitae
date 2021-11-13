import { Typography } from "@mui/material";
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
        <Timeline>{educationCards}</Timeline>
      </>
    );
  }
}
