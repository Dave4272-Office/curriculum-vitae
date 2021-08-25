import { Typography } from "@material-ui/core";
import React from "react";
import { certDetails } from "./data/cert.list";
import "./certs.sass";
export class Certs extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom className="extra-padded">
          Certifications
        </Typography>
        <div className="creds-container">{certDetails}</div>
      </>
    );
  }
}
