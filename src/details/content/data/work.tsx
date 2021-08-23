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
import { DateTime, Duration } from "luxon";

export let workDetails: React.ReactElement[] = [];

type WorkItem = {
  include: boolean;
  designation: string;
  from: DateTime;
  to: null | DateTime;
  organization: string;
  emptype: string;
  desc: string;
};

const work: WorkItem[] = [
  {
    include: true,
    designation: "Project Engineer",
    from: DateTime.local(2020, 9, 28),
    to: null,
    organization: "Wipro Limited",
    emptype: "Full Time",
    desc: "",
  },
];

const workinclude = work.filter((value) => {
  return value.include;
});

workinclude.reverse().forEach((value, index) => {
  let duration: Duration;
  let durationout = "";

  if (value.to === null) {
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

  workDetails.push(
    <TimelineItem key={index.toString()}>
      <TimelineOppositeContent className="timeline-opp-container"></TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector className={index === 0 ? "hide" : ""} />
        <TimelineDot variant="outlined" color="primary">
          <FontAwesomeIcon
            icon={["fas", "briefcase"]}
            className="timeline-icons"
          />
        </TimelineDot>
        <TimelineConnector
          className={index === workinclude.length - 1 ? "hide" : ""}
        />
      </TimelineSeparator>
      <TimelineContent>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item sm={12} md>
                <Typography variant="h5" gutterBottom>
                  {value.designation}
                </Typography>
              </Grid>
              <Grid item sm={12} md={4} container direction="column">
                <Grid item xs>
                  <Typography variant="body1" gutterBottom>
                    {value.from.toFormat("MMMM d, yyyy")} -{" "}
                    {value.to === null
                      ? "Present"
                      : value.to.toFormat("MMMM d, yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" gutterBottom>
                    {durationout}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2"></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  @ {value.organization} - {value.emptype}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">{value.desc}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2"></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom></Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TimelineContent>
    </TimelineItem>
  );
});
