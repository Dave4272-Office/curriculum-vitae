import { Container, Typography } from "@mui/material";
import React from "react";

export class Interests extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom className="extra-padded">
          Interests
        </Typography>
        <Container className="root-content">
          Hobbies &amp; Interests: 1. Learning New Things 2. Reading Novels 3.
          Sketching 4. Listening music
        </Container>
      </>
    );
  }
}
