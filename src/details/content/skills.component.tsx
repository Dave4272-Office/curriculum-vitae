import {
  ListItemAvatar,
  ListItemText,
  Avatar,
  Grid,
  List,
  ListItem,
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
          <Grid item container className="grid-coloumns">
            <Grid item md={5}>
              <Typography variant="h4">Soft skills:</Typography>
              <List>
                <ListItem divider>
                  <ListItemAvatar>
                    <Avatar>1</Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography variant="body1">
                      Good Organizing Skills.
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem divider>
                  <ListItemAvatar>
                    <Avatar>2</Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography variant="body1">
                      Team work &amp; team management.
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem divider>
                  <ListItemAvatar>
                    <Avatar>3</Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography variant="body1">
                      Good communication skills.
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item md={6}>
              <Typography variant="h4">Languages known:</Typography>
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
                  <TableBody>
                    <TableRow
                      key="English"
                      className="padding-top-bottom padding-left-right"
                    >
                      <TableCell>
                        <Typography variant="body1">English</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">Fluent</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">Fluent</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key="Bengali"
                      className="padding-top-bottom padding-left-right"
                    >
                      <TableCell>
                        <Typography variant="body1">Bengali</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">Intermediate</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">Native Fluent</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key="Hindi"
                      className="padding-top-bottom padding-left-right"
                    >
                      <TableCell>
                        <Typography variant="body1">Hindi</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">Basic</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">Fluent</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid item container className="skill-row extra-padded" >
            <Grid item className="extra-padded" >
              <Typography variant="h4">Technical Skills:</Typography>
            </Grid>
            <Divider variant="fullWidth" orientation="horizontal" className="skill-divider" />
            <Grid item className="extra-padded" >
              <SkillChip />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}
