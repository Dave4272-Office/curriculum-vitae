import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FaGraduationCap, FaRegHourglass } from "react-icons/fa";
import { AcademicRecord } from "./data/types/AcademicRecord";

type EducationCardPropType = {
  index: number;
  length: number;
  value: AcademicRecord;
};

export const EducationCard = (props: EducationCardPropType) => {
  return (
    <TimelineItem key={props.index.toString()} className="work-edu-container">
      <TimelineOppositeContent className="timeline-opp-container"></TimelineOppositeContent>
      <TimelineSeparator className="timeline-separator">
        <TimelineConnector
          className={props.index === props.length - 1 ? "hide" : ""}
        />
        <TimelineDot
          variant="outlined"
          color="primary"
          className="icon-backgrounds"
        >
          <FaGraduationCap className="timeline-icons" />
        </TimelineDot>
        <TimelineConnector className={props.index === 0 ? "hide" : ""} />
      </TimelineSeparator>
      <TimelineContent className="edu-card">
        <Card>
          <CardContent>
            <Grid container>
              <Grid item sm={12} md={9}>
                <Typography variant="h4" component="h3" gutterBottom>
                  {props.value.qualexam}
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
                    {props.value.score}
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
                  &nbsp;&nbsp;{props.value.from} -{" "}
                  {props.value.to ?? "Currently Pursuing"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h3">
                  {props.value.certauthtype} :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="span" gutterBottom>
                  {props.value.certauthname}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h3">
                  {props.value.institutetype} :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="span" gutterBottom>
                  {props.value.institutename}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h3">
                  {props.value.qualspectype} :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="span" gutterBottom>
                  {props.value.qualspec}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TimelineContent>
    </TimelineItem>
  );
};
