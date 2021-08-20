import { Avatar, Grid } from "@material-ui/core";
import React from "react";
import "./home.sass";

export class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={6}>
          <Avatar src="profile-dave.jpg" className="avatar-large" />
          </Grid>
          <Grid item xs={6}>
            <h3>Helllloooo</h3>
          </Grid>
        </Grid>
      </div>
    );
  }
}
