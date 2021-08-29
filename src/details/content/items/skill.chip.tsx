import { Chip } from "@material-ui/core";
import React from "react";
import { techSkills } from "./data/skill.list";

const chipStyles = [
  "chst1",
  "MuiChip-colorPrimary chst2",
  "MuiChip-colorSecondary chst3 chst3-span",
  "MuiChip-outlined chst1",
  "MuiChip-outlined MuiChip-outlinedPrimary chst2",
  "MuiChip-outlined MuiChip-outlinedSecondary chst3",
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
