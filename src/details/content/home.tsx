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
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs>
            <div className="profile-frame">
              <div>
                <Avatar src="profile-dave.jpg" className="profile-img" />
              </div>
            </div>
          </Grid>
          <Grid item xs>
            <h3>Helllloooo</h3>
          </Grid>
        </Grid>
      </>
    );
  }
}
