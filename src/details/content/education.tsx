import { Timeline } from "@mui/lab";
import { Container, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { Buffer } from "buffer";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { AxiosClient } from "../../HTTPClient";
import "./education.sass";
import { AcademicRecord } from "./items/data/types/AcademicRecord";
import { EducationCard } from "./items/edu.card";

export const Education = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom className="extra-padded title">
        Education
      </Typography>
      <Container className="root-content education-container">
        <Suspense fallback={<CgSpinner />}>
          <EducationBoard />
        </Suspense>
      </Container>
    </>
  );
};

const EducationBoard = () => {
  const [quals, setQuals] = useState<React.ReactElement[]>([]);

  const handleResponse = (res: AxiosResponse) => {
    setQuals([]);
    const length = res.data.length;
    res.data.forEach((element: AcademicRecord, index: number) => {
      let key: string = element.qualexam + element.from + element.to;
      key = Buffer.from(key, "binary").toString("base64");
      setQuals((quals) => [
        <EducationCard
          value={element}
          index={index}
          length={length}
          key={key}
        />,
        ...quals,
      ]);
    });
  };

  const dataFetch = useCallback(() => {
    AxiosClient().get("edu.list.json").then(handleResponse);
  }, []);

  useEffect(() => {
    dataFetch();
  }, [dataFetch]);

  return <Timeline className="edu-card-container">{quals}</Timeline>;
};
