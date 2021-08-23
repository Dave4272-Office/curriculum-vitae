import { Typography } from "@material-ui/core";
import { Timeline } from "@material-ui/lab";
import React from "react";
import { educationDetails } from "./data/edu";
import "./education.sass"

export class Education extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom className="extra-padded">
          Education
        </Typography>
        <Timeline>{educationDetails}</Timeline>
      </>
    );
  }
}
