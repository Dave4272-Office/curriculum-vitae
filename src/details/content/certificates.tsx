import { Typography } from "@material-ui/core";
import React from "react";
import { certCards } from "./items/cert.card";
import "./certificates.sass";
import Masonry from "masonry-layout";

export class Certs extends React.Component {
  componentDidMount(){
    // eslint-disable-next-line
    var msnry = new Masonry( '.creds-container', {
      columnWidth: 520,
      itemSelector: ".certificate",
      gutter: 16,
      horizontalOrder: true,
    });
  }
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
