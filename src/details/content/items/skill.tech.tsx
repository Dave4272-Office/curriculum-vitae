import { Chip } from "@mui/material";
import { AxiosResponse } from "axios";
import { Buffer } from "buffer";
import React, { useCallback, useEffect, useState } from "react";
import { AxiosClient } from "../../../HTTPClient";
import { IconMap } from "./data/types/icon.map";
import { TechSkill } from "./data/types/TechSkill";

const chipStyles = [
  "chip-style-1 tech-chip",
  "chip-style-2 tech-chip",
  "chip-style-3 tech-chip",
];

export const SkillChipsBlock = () => {
  const [chips, setChips] = useState<React.ReactElement[]>([]);

  const handleResponse = (res: AxiosResponse) => {
    setChips([]);
    let i = 0;
    res.data.reverse().forEach((element: TechSkill, index: number) => {
      let key: string = element.type + element.label;
      key = Buffer.from(key, "binary").toString("base64");
      let x = i % chipStyles.length;
      if (element.include) {
        setChips((chips) => [
          <Chip
            avatar={IconMap[element.icon]}
            className={chipStyles[x]}
            label={element.label}
            key={key}
          />,
          ...chips,
        ]);
        i++;
      }
    });
  };

  const dataFetch = useCallback(() => {
    AxiosClient().get("skill.list.json").then(handleResponse);
  }, []);

  useEffect(() => {
    dataFetch();
  }, [dataFetch]);

  return <div className="skillchip-container">{chips}</div>;
};
