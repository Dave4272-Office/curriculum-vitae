import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { langSkillList, softSkillList } from "./data/soft-lang.list";

export let softSkills: React.ReactElement[] = [];
export let langSkills: React.ReactElement[] = [];

softSkillList.forEach((value, index) => {
  softSkills.push(
    <ListItem divider key={index.toString()}>
      <ListItemAvatar>
        <Avatar className="soft-skill-list-icon">{index + 1}</Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="body1">{value}</Typography>
      </ListItemText>
    </ListItem>
  );
});

langSkillList.forEach((value, index) => {
  langSkills.push(
    <TableRow
      key={value.language}
      className="padding-top-bottom padding-left-right"
    >
      <TableCell>
        <Typography variant="body1">{value.language}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{value.readwrite}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{value.listeningspeaking}</Typography>
      </TableCell>
    </TableRow>
  );
});
