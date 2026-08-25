import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { FaArrowRight, FaAt, FaBriefcase, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { durationAsString } from "../../../utils/date-time";
import { WorkItem } from "./data/types/WorkItem";

export type WorkCardPropType = {
  index: number;
  value: WorkItem;
  length: number;
};

export const WorkCard = (props: WorkCardPropType) => {
  const durationout = durationAsString(props.value.from, props.value.to);

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
          <FaBriefcase className="timeline-icons" />
        </TimelineDot>
        <TimelineConnector className={props.index === 0 ? "hide" : ""} />
      </TimelineSeparator>
      <TimelineContent className="work-card">
        <Card>
          <CardContent>
            <Grid container className="work-item">
              <Grid container>
                <Grid container size="grow" className="work-detail">
                  <Grid size="auto">
                    <Typography variant="h4" component="h3">
                      {props.value.designation}
                    </Typography>
                  </Grid>
                  <Grid size="auto">
                    <Typography
                      variant="h5"
                      component="h4"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FaAt color="#75e900" />
                      &nbsp;&nbsp;{props.value.organization}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography
                      variant="h6"
                      component="h5"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: "5px",
                      }}
                    >
                      <FaLocationDot color="#75e900" />
                      &nbsp;&nbsp;{props.value.location}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h5"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: "5px",
                      }}
                    >
                      <FaClock color="#75e900" />
                      &nbsp;&nbsp;{props.value.emptype}
                    </Typography>
                  </Grid>
                  <Grid size="auto">
                    <Grid
                      container
                      direction="row"
                      sx={{ alignItems: "center" }}
                    >
                      <Typography
                        variant="body1"
                        component="div"
                        align="center"
                        sx={{ marginTop: "2px" }}
                      >
                        From: {props.value.from.toFormat("MMM yyyy")}
                      </Typography>
                      <FaArrowRight
                        color="#0000ff"
                        style={{ marginLeft: "5px", marginRight: "5px" }}
                      />
                      <Typography
                        variant="body1"
                        component="div"
                        align="center"
                        sx={{ marginTop: "2px" }}
                      >
                        To:{" "}
                        {!props.value.to
                          ? "Present"
                          : props.value.to.toFormat("MMM yyyy")}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid size="auto">
                    <Typography variant="body1">{durationout}</Typography>
                  </Grid>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  className="work-logo-divider"
                />
                <CardMedia
                  image={props.value.organizationicon}
                  className="work-org-icon"
                />
              </Grid>
              <Divider variant="fullWidth" className="work-desc-divider" />
              <Grid size={12}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  title="Work Description"
                >
                  {props.value.desc}
                </Typography>
              </Grid>
              <Grid size={12}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  title="Work Skills Used"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {props.value.skills}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TimelineContent>
    </TimelineItem>
  );
};
