import { Timeline } from "@mui/lab";
import {
  Chip,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { Buffer } from "buffer";
import { DateTime } from "luxon";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import { AxiosClient } from "../../HTTPClient";
import "./experience.sass";
import { IWorkItem, WorkItem } from "./items/data/types/WorkItem";
import { WorkCard } from "./items/work.card";

export const Experience = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom className="extra-padded title">
        Experience
      </Typography>
      <Container className="root-content experience-container">
        <Suspense fallback={<CgSpinner />}>
          <ExperienceBoard />
        </Suspense>
      </Container>
    </>
  );
};

const ExperienceDescription = (props: { desc: string[] }) => {
  const [expdesc, setExpdesc] = useState<React.ReactElement[]>([]);
  const convertToList = useCallback(() => {
    setExpdesc([]);
    props.desc.forEach((val) => {
      const key = Buffer.from(val, "binary").toString("base64");
      setExpdesc((expdesc) => [
        <ListItem key={key}>
          <ListItemIcon style={{ minWidth: "30px" }}>
            <GoDotFill />
          </ListItemIcon>
          <ListItemText primary={val} />
        </ListItem>,
        ...expdesc,
      ]);
    });
    setExpdesc((value) => {
      let x = value;
      return x.reverse();
    });
  }, [props.desc]);

  useEffect(() => {
    convertToList();
  }, [convertToList]);

  return <List dense>{expdesc}</List>;
};

const ExperienceSkill = (props: { skills: string[] }) => {
  const [expskills, setExpskills] = useState<React.ReactElement[]>([]);
  const convertToList = useCallback(() => {
    setExpskills([]);
    props.skills.reverse().forEach((val) => {
      const key = Buffer.from(val, "binary").toString("base64");
      setExpskills((expskills) => [
        <Chip style={{ margin: "5px" }} label={val} key={key} />,
        ...expskills,
      ]);
    });
  }, [props.skills]);

  useEffect(() => {
    convertToList();
  }, [convertToList]);

  return <>{expskills}</>;
};

const ExperienceBoard = () => {
  const [exp, setExp] = useState<React.ReactElement[]>([]);

  const handleResponse = (res: AxiosResponse) => {
    setExp([]);
    const length = res.data.length;
    res.data.reverse().forEach((element: IWorkItem, index: number) => {
      let key: string =
        element.designation + element.organization + element.from;
      key = Buffer.from(key, "binary").toString("base64");
      let value: WorkItem = {
        ...element,
        from: DateTime.fromFormat(element.from, "yyyy-MM"),
        to: element.to
          ? DateTime.fromFormat(element.to, "yyyy-MM").endOf("month")
          : undefined,
        desc: <ExperienceDescription desc={element.desc} />,
        skills: <ExperienceSkill skills={element.skills} />,
      };
      if (element.include) {
        setExp((exp) => [
          <WorkCard index={index} value={value} key={key} length={length} />,
          ...exp,
        ]);
      }
    });
  };

  const dataFetch = useCallback(() => {
    AxiosClient().get("work.list.json").then(handleResponse);
  }, []);

  useEffect(() => {
    dataFetch();
  }, [dataFetch]);

  return <Timeline className="work-card-container">{exp}</Timeline>;
};
