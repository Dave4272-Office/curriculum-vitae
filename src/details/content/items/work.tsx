import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
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
  to?: DateTime;
  organization: string;
  organizationicon: string;
  emptype: string;
  desc: React.ReactElement;
};

const work: WorkItem[] = [
  {
    include: true,
    designation: "Project Engineer",
    from: DateTime.local(2020, 9, 28),
    organization: "Wipro Limited",
    organizationicon: "static/logos/third-party/Wipro.png",
    emptype: "Full Time",
    desc: (
      <ul>
        <li>Working in Agile project in finance sector.</li>
        <li>
          Developed critical application modules related to foreign currency
          exchange.
        </li>
        <li>Handled deployments to production.</li>
        <li>Technologies used:</li>
        <ul>
          <li>Java</li>
          <li>Spring Boot</li>
          <li>Redis</li>
          <li>PCF</li>
          <li>Oracle Database</li>
        </ul>
      </ul>
    ),
  },
];

const workinclude = work.filter((value) => {
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

  workDetails.push(
    <TimelineItem key={index.toString()} className="work-edu-container">
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
      <TimelineContent className="work-card">
        <Card>
          <CardContent>
            <Grid container className="work-item">
              <Grid container>
                <Grid item container xs className="work-detail">
                  <Grid item>
                    <Typography variant="h4" gutterBottom>
                      {value.designation}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      <FontAwesomeIcon icon={["fas", "at"]} color="#75e900" />
                      &nbsp;&nbsp;{value.organization}&nbsp;&nbsp;&nbsp;&bull;
                      &nbsp;&nbsp;{value.emptype}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {value.from.toFormat("MMMM d, yyyy")}{" "}
                      <span className="hyphen-hide">&mdash;</span>{" "}
                      {!value.to
                        ? "Present"
                        : value.to.toFormat("MMMM d, yyyy")}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {durationout}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  className="work-logo-divider"
                />
                <Grid item xs className="work-org-icon">
                  <Avatar src={value.organizationicon}></Avatar>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" className="work-desc-divider" />
              <Grid item xs={12}>
                <Typography variant="subtitle2">{value.desc}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TimelineContent>
    </TimelineItem>
  );
});
