import { Container, Typography } from "@mui/material";
import React from "react";
import { certCards } from "./items/cert.card";
import "./certificates.sass";
import Masonry from "masonry-layout";

export class Certs extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line
    var msnry = new Masonry(".creds-container", {
      columnWidth: 520,
      itemSelector: ".certificate",
      gutter: 20,
      horizontalOrder: true,
      fitWidth: true,
    });
  }
  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom className="extra-padded">
          Certifications
        </Typography>
        <Container className="root-content certificate-container">
          <Container className="creds-container">
            {certCards}
          </Container>
        </Container>
      </>
    );
  }
}
