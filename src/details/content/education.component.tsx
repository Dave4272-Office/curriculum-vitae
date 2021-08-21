import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@material-ui/lab";
import React from "react";
import "./education.sass";

export class Education extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h2" gutterBottom className="extra-padded">
          Education
        </Typography>
        <Timeline>
          <TimelineItem>
            <TimelineOppositeContent className="year-container">
              <Typography variant="h6" gutterBottom>
                2016 - 2020
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector className="hide" />
              <TimelineDot variant="outlined" color="primary">
                <FontAwesomeIcon
                  icon={["fas", "graduation-cap"]}
                  className="timeline-icons"
                />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item sm={12} md={9}>
                      <Typography variant="h4" gutterBottom>
                        B. Tech
                      </Typography>
                    </Grid>
                    <Grid item sm={12} md={3} container direction="column">
                      <Grid item xs>
                        <Typography variant="subtitle2">Score :</Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="body1" gutterBottom>
                          8.32 DGPA
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">University :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Maulana Abul Kalam Azad University of Technology
                        (MAKAUT)
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">College :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Birbhum Institute of Engineering and Technology, Suri
                        (BIET, Suri)
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Major :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Computer Science and Engineering (CSE)
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent className="year-container">
              <Typography variant="h6" gutterBottom>
                2014 - 2016
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot variant="outlined" color="secondary">
                <FontAwesomeIcon
                  icon={["fas", "graduation-cap"]}
                  className="timeline-icons"
                />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item sm={12} md={9}>
                      <Typography variant="h4" gutterBottom>
                        AISSCE (Sr. Secondary | XII)
                      </Typography>
                    </Grid>
                    <Grid item sm={12} md={3} container direction="column">
                      <Grid item xs>
                        <Typography variant="subtitle2">Score :</Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="body1" gutterBottom>
                          84.00 %
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Board :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Central Board of Secondary Education (CBSE)
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">School :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Sainik School Purulia (SSP)
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Subjects :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        English, Physics, Chemistry, Mathematics, Computer
                        Science(C++)
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent className="year-container">
              <Typography variant="h6" gutterBottom>
                2009 - 2014
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot variant="outlined" color="primary">
                <FontAwesomeIcon
                  icon={["fas", "graduation-cap"]}
                  className="timeline-icons"
                />
              </TimelineDot>
              <TimelineConnector className="hide" />
            </TimelineSeparator>
            <TimelineContent>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item sm={12} md={9}>
                      <Typography variant="h4" gutterBottom>
                        AISSE (Secondary | X)
                      </Typography>
                    </Grid>
                    <Grid item sm={12} md={3} container direction="column">
                      <Grid item xs>
                        <Typography variant="subtitle2">Score :</Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="body1" gutterBottom>
                          9.2 CGPA (87.40 %)
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Board :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Central Board of Secondary Education (CBSE)
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">School :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Sainik School Purulia (SSP)
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Subjects :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        General Education
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    );
  }
}
