import { Typography } from "@material-ui/core";
import { Timeline } from "@material-ui/lab";
import React from "react";
import { workDetails } from "./items/work";
import "./experience.sass";

export class Experience extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom className="extra-padded">
          Experience
        </Typography>
        <Timeline>{workDetails}</Timeline>
      </>
    );
  }
}
