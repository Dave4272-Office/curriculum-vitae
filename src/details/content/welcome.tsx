import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { AnimatedHeadline } from "./animated-headline";
import { Animate } from "./animated-headline/animate";
import "./welcome.sass";

export class Welcome extends React.Component {
  componentDidMount() {
    Animate();
  }

  render() {
    return <>
      <Typography variant="h2" gutterBottom className="extra-padded">
        Welcome
      </Typography>
      <Grid container direction="column" alignItems="center">
        <Grid item container>
          <Grid item container xs={12} sm={4} justifyContent="center">
            <Card className="profile-card">
              <CardContent className="profile-card-container">
                <div className="profile-frame">
                  <div>
                    <Avatar src="profile-dave.jpg" className="profile-img" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item container xs={12} sm justifyContent="center">
            <Card className="bio-card">
              <CardContent>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <Typography
                      variant="h3"
                      gutterBottom
                      className="extra-padded"
                    >
                      Hi I am Debraj Kundu
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h4"
                      gutterBottom
                      className="extra-padded"
                    >
                      <AnimatedHeadline
                        values={[
                          "Developer",
                          "Learner",
                          "Full Stack",
                          "Linux",
                          "Open Source",
                        ]}
                      />
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center">
          <Card className="goal-card">
            <CardContent>
              <Typography variant="h6" className="extra-gutter">
                I am focused on learning anything related to technology, with
                a particular interest in Cyber Security and AI.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item container>
          <Grid item container xs={12} sm>
            <Card className="social-card">
              <CardContent>
                <Grid container>
                  <Grid item xs>
                    <IconButton
                      component="a"
                      href="https://twitter.com/Dave4272dk"
                      target="_blank"
                      rel="noreferrer noopener"
                      size="large">
                      <FontAwesomeIcon
                        color="#1d9bf0"
                        icon={["fab", "twitter"]}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <IconButton
                      component="a"
                      href="https://www.linkedin.com/in/debraj-kundu/"
                      target="_blank"
                      rel="noreferrer noopener"
                      size="large">
                      <FontAwesomeIcon
                        color="#0a66c2"
                        icon={["fab", "linkedin"]}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <IconButton
                      component="a"
                      href="https://www.facebook.com/Dave4272dk"
                      target="_blank"
                      rel="noreferrer noopener"
                      size="large">
                      <FontAwesomeIcon
                        color="#1877f2"
                        icon={["fab", "facebook"]}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <IconButton
                      component="a"
                      href="https://www.instagram.com/dave4272dk/"
                      target="_blank"
                      rel="noreferrer noopener"
                      disabled
                      size="large">
                      <FontAwesomeIcon
                        color="#d80f68"
                        icon={["fab", "instagram"]}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <IconButton
                      component="a"
                      href="https://www.youtube.com/channel/UC8qOYPxjzhzDsq3a2s_-oPw"
                      target="_blank"
                      rel="noreferrer noopener"
                      disabled
                      size="large">
                      <FontAwesomeIcon
                        color="#ff0000"
                        icon={["fab", "youtube"]}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <IconButton
                      component="a"
                      href="https://www.reddit.com/user/UnknownHostD72"
                      target="_blank"
                      rel="noreferrer noopener"
                      disabled
                      size="large">
                      <FontAwesomeIcon
                        color="#ff4500"
                        icon={["fab", "reddit"]}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item container xs={12} sm>
            <Card className="tech-card">
              <CardContent>
                <Grid container>
                  <Grid item xs>
                    <IconButton
                      component="a"
                      href="https://github.com/Dave4272-Office"
                      target="_blank"
                      rel="noreferrer noopener"
                      size="large">
                      <FontAwesomeIcon
                        color="#000000"
                        icon={["fab", "github"]}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <IconButton
                      component="a"
                      href="https://keybase.io/dave4272"
                      target="_blank"
                      rel="noreferrer noopener"
                      size="large">
                      <FontAwesomeIcon
                        color="#ff6f21"
                        icon={["fab", "keybase"]}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>;
  }
}
