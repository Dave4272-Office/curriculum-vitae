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
  Card,
  CardContent,
} from "@mui/material";
import React from "react";
import { langSkills, softSkills } from "./items/skills.soft-lang";
import { SkillChipsBlock } from "./items/skill.chip";
import "./skills.sass";
import "./skillchip.sass";

export class Skills extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h2" className="extra-padded">
          Skills
        </Typography>
        <Grid container direction="column" alignItems="center">
          <Grid item container>
            <Grid item container xs={12} md={5} justifyContent="center">
              <Card className="soft-card">
                <CardContent>
                  <div className="sub-head-title">
                    <Avatar className="sub-head-icon skill-text">S</Avatar>
                    <Typography
                      variant="h4"
                      component="h3"
                      className="sub-head-text"
                    >
                      Soft Skills:
                    </Typography>
                  </div>
                  <List>{softSkills}</List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md justifyContent="center">
              <Card className="lang-card">
                <CardContent>
                  <div className="sub-head-title">
                    <Avatar className="sub-head-icon">
                      <FontAwesomeIcon icon={["fas", "language"]} />
                    </Avatar>
                    <Typography
                      variant="h4"
                      component="h3"
                      className="sub-head-text"
                    >
                      Languages Known:
                    </Typography>
                  </div>
                  <TableContainer className="padding-top-bottom">
                    <Table>
                      <TableHead>
                        <TableRow className="padding-left-right">
                          <TableCell className="padding-top-bottom-imp">
                            <Typography variant="h6" component="h4">
                              Language
                            </Typography>
                          </TableCell>
                          <TableCell className="padding-top-bottom-imp">
                            <Typography variant="h6" component="h4">
                              Reading &amp; Writing
                            </Typography>
                          </TableCell>
                          <TableCell className="padding-top-bottom-imp">
                            <Typography variant="h6" component="h4">
                              Listening &amp; Speaking
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{langSkills}</TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center" alignItems="center">
            <Card className="skill-card">
              <CardContent>
                <Grid container>
                  <Grid item className="extra-padded">
                    <Typography variant="h4">Technical Skills:</Typography>
                  </Grid>
                  <Divider orientation="horizontal" className="skill-divider" />
                  <Grid item className="extra-padded">
                    <SkillChipsBlock />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}
