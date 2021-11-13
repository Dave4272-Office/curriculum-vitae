import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import React from "react";
import { DateTime, Duration } from "luxon";
import { workList } from "./data/work";
import { FaAt, FaBriefcase, FaClock } from "react-icons/fa";

export let workCards: React.ReactElement[] = [];

const workinclude = workList.filter((value) => {
  return value.include;
});

workinclude.reverse().forEach((value, index) => {
  let duration: Duration;
  let durationout = "";

  if (!value.to) {
    duration = DateTime.now().diff(value.from, ["year", "months", "day"], {
      conversionAccuracy: "longterm",
    });
  } else {
    duration = value.to.diff(value.from, ["years", "months", "days"], {
      conversionAccuracy: "longterm",
    });
  }

  if (parseInt(duration.years.toFixed(0)) !== 0) {
    durationout += duration.years.toFixed(0) + " yr ";
  }

  if (parseInt(duration.months.toFixed(0)) !== 0) {
    durationout += duration.months.toFixed(0) + " mo ";
  }

  if (parseInt(duration.days.toFixed(0)) !== 0) {
    durationout += duration.days.toFixed(0) + " dy";
  }

  workCards.push(
    <TimelineItem key={index.toString()} className="work-edu-container">
      <TimelineOppositeContent className="timeline-opp-container"></TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector className={index === 0 ? "hide" : ""} />
        <TimelineDot variant="outlined" color="primary">
          <FaBriefcase className="timeline-icons" />
        </TimelineDot>
        <TimelineConnector
          className={index === workinclude.length - 1 ? "hide" : ""}
        />
      </TimelineSeparator>
      <TimelineContent className="work-card">
        <Card>
          <CardContent>
            <Grid container className="work-item">
              <Grid container>
                <Grid item container xs className="work-detail">
                  <Grid item>
                    <Typography variant="h4" component="h3">
                      {value.designation}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h4">
                      <FaAt color="#75e900" />
                      &nbsp;&nbsp;{value.organization}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" component="h5">
                      <FaClock color="#75e900" />
                      &nbsp;&nbsp;{value.emptype}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" align="center">
                      From : {value.from.toFormat("MMMM d, yyyy")}
                      <br />
                      To :{" "}
                      {!value.to
                        ? "Present"
                        : value.to.toFormat("MMMM d, yyyy")}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{durationout}</Typography>
                  </Grid>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  className="work-logo-divider"
                />
                <CardMedia
                  image={value.organizationicon}
                  className="work-org-icon"
                />
              </Grid>
              <Divider variant="fullWidth" className="work-desc-divider" />
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  title="Work Description"
                >
                  {value.desc}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TimelineContent>
    </TimelineItem>
  );
});
