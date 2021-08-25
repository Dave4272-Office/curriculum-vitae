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

export let educationDetails: React.ReactElement[] = [];

const eduList = [
  {
    from: "2009",
    to: "2014",
    qualexam: "AISSE (Secondary | X)",
    score: "9.2 CGPA (87.40 %)",
    certauthtype: "Board",
    certauthname: "Central Board of Secondary Education (CBSE)",
    institutetype: "School",
    institutename: "Sainik School Purulia (SSP)",
    qualspectype: "Subjects",
    qualspec: "General Education",
  },
  {
    from: "2014",
    to: "2016",
    qualexam: "AISSCE (Sr. Secondary | XII)",
    score: "84.00 %",
    certauthtype: "Board",
    certauthname: "Central Board of Secondary Education (CBSE)",
    institutetype: "School",
    institutename: "Sainik School Purulia (SSP)",
    qualspectype: "Subjects",
    qualspec: "English, Physics, Chemistry, Mathematics, Computer Science(C++)",
  },
  {
    from: "2016",
    to: "2020",
    qualexam: "B. Tech",
    score: "8.32 DGPA",
    certauthtype: "University",
    certauthname: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
    institutetype: "College",
    institutename:
      "Birbhum Institute of Engineering and Technology, Suri (BIET, Suri)",
    qualspectype: "Major",
    qualspec: "Computer Science and Engineering (CSE)",
  },
];

eduList.reverse().forEach((value, index) => {
  educationDetails.push(
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
