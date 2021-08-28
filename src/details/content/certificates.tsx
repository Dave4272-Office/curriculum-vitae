import { Typography } from "@material-ui/core";
import React from "react";
import { certCards } from "./items/cert.card";
import "./certificates.sass";
export class Certs extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom className="extra-padded">
          Certifications
        </Typography>
        <div className="creds-container">{certCards}</div>
      </>
    );
  }
}
