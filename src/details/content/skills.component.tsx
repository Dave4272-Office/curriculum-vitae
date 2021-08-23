import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Grid,
  List,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Divider,
} from "@material-ui/core";
import React from "react";
import { langSkill, softSkill } from "./data/skills.soft-lang";
import { SkillChip } from "./skillchip.component";
import "./skills.sass";

export class Skills extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" className="extra-padded">
          Skills
        </Typography>
        <Grid container spacing={3}>
          <Grid item container className="grid-columns">
            <Grid item md={5}>
              <div className="sub-head-title">
                <Avatar className="sub-head-icon skill-text">S</Avatar>
                <Typography variant="h4" className="sub-head-text">
                  Soft Skills:
                </Typography>
              </div>
              <List>{softSkill}</List>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item md={6}>
              <div className="sub-head-title">
                <Avatar className="sub-head-icon">
                  <FontAwesomeIcon icon={["fas", "language"]} />
                </Avatar>
                <Typography variant="h4" className="sub-head-text">
                  Languages Known:
                </Typography>
              </div>
              <TableContainer className="padding-top-bottom">
                <Table>
                  <TableHead>
                    <TableRow className="padding-left-right">
                      <TableCell className="padding-top-bottom-imp">
                        <Typography variant="h6">Language</Typography>
                      </TableCell>
                      <TableCell className="padding-top-bottom-imp">
                        <Typography variant="h6">Reading / Writing</Typography>
                      </TableCell>
                      <TableCell className="padding-top-bottom-imp">
                        <Typography variant="h6">
                          Listening / Speaking
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{langSkill}</TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid item container className="skill-row extra-padded">
            <Grid item className="extra-padded">
              <Typography variant="h4">Technical Skills:</Typography>
            </Grid>
            <Divider orientation="horizontal" className="skill-divider" />
            <Grid item className="extra-padded">
              <SkillChip />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}
