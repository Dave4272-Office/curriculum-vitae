"use client";

import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import {
  FaGithub,
  FaInstagram,
  FaKeybase,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SiTryhackme } from "react-icons/si";
import { AnimatedHeadline } from "./animated-headline";
import { Animate } from "./animated-headline/animate";

export const Welcome = () => {
  useEffect(() => {
    Animate();
  }, []);

  return (
    <>
      <Typography variant="h2" gutterBottom className="extra-padded title">
        Welcome
      </Typography>
      <Container className="root-content welcome-container">
        <Stack sx={{ alignItems: "center" }}>
          <Grid container>
            <Grid
              container
              size={{ md: 12, lg: 5, xl: 4 }}
              sx={{ justifyContent: "center" }}
            >
              <Card className="profile-card">
                <CardContent className="profile-card-container">
                  <div className="profile-frame">
                    <div>
                      <Avatar
                        src="profile-dave.jpg"
                        className="profile-img"
                        alt="My Picture"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              container
              size={{ md: 12, lg: "grow", xl: "grow" }}
              sx={{ justifyContent: "center" }}
            >
              <Card className="bio-card">
                <CardContent>
                  <Stack
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography
                      variant="h3"
                      gutterBottom
                      className="extra-padded"
                    >
                      Hi I am Debraj Kundu
                    </Typography>
                    <Typography
                      variant="h4"
                      gutterBottom
                      className="extra-padded"
                    >
                      <AnimatedHeadline
                        values={[
                          "Software Engineer",
                          "Developer",
                          "Learner",
                          "Full Stack",
                          "Linux",
                          "Open Source",
                        ]}
                      />
                    </Typography>
                    <div>
                      <Typography variant="h4" className="extra-gutter">
                        I am a learner at heart,
                      </Typography>
                      <Typography variant="h4" className="extra-gutter">
                        an experimenter in mind,
                      </Typography>
                      <Typography variant="h4" className="extra-gutter">
                        an adventurer from the soul.
                      </Typography>
                      <Typography variant="h4" className="extra-gutter">
                        I thrive on challenges.
                      </Typography>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Card className="goal-card">
              <CardContent>
                <Typography variant="h6" component="p" className="extra-gutter">
                  I am focused on learning anything related to technology, with
                  a particular interest in Cyber Security and AI.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid container>
            <Grid container size={{ xs: 12, sm: "grow" }}>
              <Card className="social-card">
                <CardContent>
                  <Grid container>
                    <Grid size="grow">
                      <IconButton
                        component="a"
                        href="https://twitter.com/Dave4272dk"
                        target="_blank"
                        rel="noreferrer noopener"
                        size="large"
                        aria-label="Twitter profile link"
                      >
                        <FaTwitter color="#1d9bf0" />
                      </IconButton>
                    </Grid>
                    <Grid size="grow">
                      <IconButton
                        component="a"
                        href="https://www.linkedin.com/in/debraj-kundu/"
                        target="_blank"
                        rel="noreferrer noopener"
                        size="large"
                        aria-label="LinkedIn profile link"
                      >
                        <FaLinkedin color="#0a66c2" />
                      </IconButton>
                    </Grid>
                    <Grid size="grow">
                      <IconButton
                        component="a"
                        href="https://www.instagram.com/dave4272dk/"
                        target="_blank"
                        rel="noreferrer noopener"
                        size="large"
                        aria-label="Instagram profile link"
                      >
                        <FaInstagram color="#d80f68" />
                      </IconButton>
                    </Grid>
                    <Grid size="grow">
                      <IconButton
                        component="a"
                        href="https://www.youtube.com/channel/UC8qOYPxjzhzDsq3a2s_-oPw"
                        target="_blank"
                        rel="noreferrer noopener"
                        disabled
                        size="large"
                        aria-label="YouTube profile link"
                      >
                        <FaYoutube color="#ff0000" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid container size={{ xs: 12, sm: "grow" }}>
              <Card className="tech-card">
                <CardContent>
                  <Grid container>
                    <Grid size="grow">
                      <IconButton
                        component="a"
                        href="https://github.com/Dave4272-Office"
                        target="_blank"
                        rel="noreferrer noopener"
                        size="large"
                        aria-label="Github profile link"
                      >
                        <FaGithub color="#000000" />
                      </IconButton>
                    </Grid>
                    <Grid size="grow">
                      <IconButton
                        component="a"
                        href="https://keybase.io/dave4272"
                        target="_blank"
                        rel="noreferrer noopener"
                        size="large"
                        aria-label="Keybase profile link"
                      >
                        <FaKeybase color="#ff6f21" />
                      </IconButton>
                    </Grid>
                    <Grid size="grow">
                      <IconButton
                        component="a"
                        href="https://tryhackme.com/p/Dave4272"
                        target="_blank"
                        rel="noreferrer noopener"
                        size="large"
                        aria-label="TryHackMe profile link"
                      >
                        <SiTryhackme color="#c11111" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};
