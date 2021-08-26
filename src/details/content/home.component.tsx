import { Avatar, Grid, Typography } from "@material-ui/core";
import React from "react";
import "./home.sass";

export class Home extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom className="extra-padded">
          Home
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs>
            <Avatar src="profile-dave.jpg" className="avatar-large" />
          </Grid>
          <Grid item xs>
            <h3>Helllloooo</h3>
          </Grid>
        </Grid>
      </>
    );
  }
}
