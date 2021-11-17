import { Chip } from "@mui/material";
import React from "react";
import { techSkills } from "./data/skill.list";

const chipStyles = [
  "chip-style-1 tech-chip",
  "chip-style-2 tech-chip",
  "chip-style-3 tech-chip",
];

let chips: React.ReactElement[] = [];

let i = 0;

techSkills.forEach((value, index) => {
  if (value.include) {
    let x = i % chipStyles.length;
    chips.push(
      <Chip
        avatar={value.icon}
        className={chipStyles[x]}
        label={value.label}
        key={value.label}
      />
    );
    i = i + 1;
  }
});

export class SkillChipsBlock extends React.Component {
  render() {
    return <div className="skillchip-container">{chips}</div>;
  }
}
