import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@material-ui/lab";
import React from "react";
import { eduList } from "./data/edu.list";

export let educationCards: React.ReactElement[] = [];

eduList.reverse().forEach((value, index) => {
  educationCards.push(
    <TimelineItem key={index.toString()} className="work-edu-container">
      <TimelineOppositeContent className="timeline-opp-container">
        <Typography variant="h6" gutterBottom>
          {value.from} - {value.to}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector className={index === 0 ? "hide" : ""} />
        <TimelineDot variant="outlined" color="primary">
          <FontAwesomeIcon
            icon={["fas", "graduation-cap"]}
            className="timeline-icons"
          />
        </TimelineDot>
        <TimelineConnector
          className={index === eduList.length - 1 ? "hide" : ""}
        />
      </TimelineSeparator>
      <TimelineContent>
        <Card className="edu-card">
          <CardContent>
            <Grid container>
              <Grid item sm={12} md={9}>
                <Typography variant="h4" gutterBottom>
                  {value.qualexam}
                </Typography>
              </Grid>
              <Grid item sm={12} md={3} id="score" container direction="column">
                <Grid item xs>
                  <Typography variant="subtitle2">Score :</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" gutterBottom>
                    {value.score}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  {value.certauthtype} :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {value.certauthname}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  {value.institutetype} :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {value.institutename}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  {value.qualspectype} :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
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
