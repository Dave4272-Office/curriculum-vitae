import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Typography } from "@material-ui/core";
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
        <h2>Education</h2>
        8.32 DGPA
        <br />
        <br />
        84.0 %
        <br />
        <br />
        9.2 CGPA (87.4 %)
        <br />
        <br />
        <br />
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
                  <Typography variant="h4" gutterBottom>
                    B. Tech
                  </Typography>
                  <Typography variant="subtitle2">University :</Typography>
                  <Typography variant="h6" gutterBottom>
                    Maulana Abul Kalam Azad University of Technology
                  </Typography>
                  <Typography variant="subtitle2">College :</Typography>
                  <Typography variant="h6" gutterBottom>
                    Birbhum Institute of Engineering and Technology, Suri
                  </Typography>
                  <Typography variant="subtitle2">Major :</Typography>
                  <Typography variant="h6" gutterBottom>
                    Computer Science and Engineering
                  </Typography>
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
                  <Typography variant="h4" gutterBottom>
                    AISSCE (Sr. Secondary)
                  </Typography>
                  <Typography variant="subtitle2">Board :</Typography>
                  <Typography variant="h6" gutterBottom>
                    CBSE
                  </Typography>
                  <Typography variant="subtitle2">School :</Typography>
                  <Typography variant="h6" gutterBottom>
                    Sainik School Purulia
                  </Typography>
                  <Typography variant="subtitle2">Subjects :</Typography>
                  <Typography variant="h6" gutterBottom>
                    ENG, PHY, CHEM, MATH, CS(C++)
                  </Typography>
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
                  <Typography variant="h4" gutterBottom>
                    AISSE (Secondary)
                  </Typography>
                  <Typography variant="subtitle2">Board :</Typography>
                  <Typography variant="h6" gutterBottom>
                    CBSE
                  </Typography>
                  <Typography variant="subtitle2">School :</Typography>
                  <Typography variant="h6" gutterBottom>
                    Sainik School Purulia
                  </Typography>
                  <Typography variant="subtitle2">Subjects :</Typography>
                  <Typography variant="h6" gutterBottom>
                    General Education
                  </Typography>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    );
  }
}
