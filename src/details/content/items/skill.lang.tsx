import { TableCell, TableRow, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { Buffer } from "buffer";
import { useCallback, useEffect, useState } from "react";
import { AxiosClient } from "../../../HTTPClient";
import { Language } from "./data/types/Language";

const LanguageItem = (props: { value: Language }) => {
  return (
    <TableRow
      key={props.value.language}
      className="padding-top-bottom padding-left-right"
    >
      <TableCell>
        <Typography variant="body1" textAlign="center">
          {props.value.language}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" textAlign="center">
          {props.value.readwrite}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" textAlign="center">
          {props.value.listeningspeaking}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export const LanguageBoard = () => {
  const [langs, setLangs] = useState<React.ReactElement[]>([]);

  const handleResponse = (res: AxiosResponse) => {
    setLangs([]);
    res.data.reverse().forEach((element: Language) => {
      let key: string = element.language;
      key = Buffer.from(key, "binary").toString("base64");
      setLangs((langs) => [
        <LanguageItem value={element} key={key} />,
        ...langs,
      ]);
    });
  };

  const dataFetch = useCallback(() => {
    AxiosClient().get("lang.list.json").then(handleResponse);
  }, []);

  useEffect(() => {
    dataFetch();
  }, [dataFetch]);

  return <>{langs}</>;
};
