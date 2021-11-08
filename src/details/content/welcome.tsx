import { Avatar, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { AnimatedHeadline } from "./items/animated.headline";
import "./welcome.sass";

export class Welcome extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" gutterBottom className="extra-padded">
          Welcome
        </Typography>
        <Grid container direction="column" alignItems="center">
          <Grid item container>
            <Grid item>
              <div className="profile-frame">
                <div>
                  <Avatar src="profile-dave.jpg" className="profile-img" />
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Typography variant="h3" gutterBottom className="extra-padded">
                  Hi I am Debraj Kundu
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4" gutterBottom className="extra-padded">
                  Developer | Learner | Full Stack | Linux | Open Source
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4" className="extra-gutter">
                  I am a learner at heart,
                </Typography>
                <Typography variant="h4" className="extra-gutter">
                  experimenter in mind,
                </Typography>
                <Typography variant="h4" className="extra-gutter">
                  adventurer in the soul.
                </Typography>
                <Typography variant="h4" className="extra-gutter">
                  I thrive on challenges.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider orientation="horizontal" className="home-divider" />
          <Grid item>
            <Typography variant="h6" className="extra-gutter">
              I am focused on learning anything related to technology, with a
              particular interest in Cyber Security and AI.
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}
