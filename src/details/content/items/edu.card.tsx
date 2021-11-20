import { Card, CardContent, Grid, Typography } from "@mui/material";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import React from "react";
import { eduList } from "./data/edu.list";
import { FaGraduationCap, FaRegHourglass } from "react-icons/fa";

export let educationCards: React.ReactElement[] = [];

eduList.reverse().forEach((value, index) => {
  educationCards.push(
    <TimelineItem key={index.toString()} className="work-edu-container">
      <TimelineOppositeContent className="timeline-opp-container"></TimelineOppositeContent>
      <TimelineSeparator className="timeline-separator">
        <TimelineConnector className={index === 0 ? "hide" : ""} />
        <TimelineDot
          variant="outlined"
          color="primary"
          className="icon-backgrounds"
        >
          <FaGraduationCap className="timeline-icons" />
        </TimelineDot>
        <TimelineConnector
          className={index === eduList.length - 1 ? "hide" : ""}
        />
      </TimelineSeparator>
      <TimelineContent className="edu-card">
        <Card>
          <CardContent>
            <Grid container>
              <Grid item sm={12} md={9}>
                <Typography variant="h4" component="h3" gutterBottom>
                  {value.qualexam}
                </Typography>
              </Grid>
              <Grid item sm={12} md={3} id="score" container direction="column">
                <Grid item xs>
                  <Typography variant="subtitle2" component="h3">
                    Score :
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" component="span" gutterBottom>
                    {value.score}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <FaRegHourglass color="#f97501" />
                  &nbsp;&nbsp;{value.from} -{" "}
                  {!value.to ? "Currently Pursuing" : value.to}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h3">
                  {value.certauthtype} :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="span" gutterBottom>
                  {value.certauthname}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h3">
                  {value.institutetype} :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="span" gutterBottom>
                  {value.institutename}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h3">
                  {value.qualspectype} :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="span" gutterBottom>
                  {value.qualspec}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TimelineContent>
    </TimelineItem>
  );
});
