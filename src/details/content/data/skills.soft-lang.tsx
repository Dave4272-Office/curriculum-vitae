import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";

export let softSkill: React.ReactElement[] = [];
export let langSkill: React.ReactElement[] = [];

const softSkillList = [
  "Good Organizing Skills.",
  "Team work & team management.",
  "Good communication skills.",
];

const langSkillList = [
  {
    language: "English",
    readwrite: "Fluent",
    listeningspeaking: "Fluent",
  },
  {
    language: "Bengali",
    readwrite: "Intermediate",
    listeningspeaking: "Native Fluent",
  },
  {
    language: "Hindi",
    readwrite: "Basic",
    listeningspeaking: "Fluent",
  },
];

softSkillList.forEach((value, index) => {
  softSkill.push(
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
  langSkill.push(
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
