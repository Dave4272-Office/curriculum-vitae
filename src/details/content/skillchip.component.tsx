import { Chip } from "@material-ui/core";
import React from "react";
import "./skillchip.sass";
import { faskills } from "./skilllist.fa";

const chipStyles = [
  "chst1",
  "MuiChip-colorPrimary chst2",
  "MuiChip-colorSecondary chst3",
  "MuiChip-outlined chst1",
  "MuiChip-outlined MuiChip-outlinedPrimary chst2",
  "MuiChip-outlined MuiChip-outlinedSecondary chst3",
];

let chips: React.ReactElement[] = [];
let i = 0;
faskills.forEach((value, index) => {
  if (value.include) {
    let x = i % 6;
    if (value.faicon) {
      chips.push(
        <Chip
          avatar={value.faicon}
          className={chipStyles[x]}
          label={value.label}
        />
      );
    }
    i = i + 1;
  }
});

export class SkillChip extends React.Component {
  render() {
    return <div className="skillchip-container">{chips}</div>;
  }
}
