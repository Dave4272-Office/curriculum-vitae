import { Container, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { Buffer } from "buffer";
import { DateTime } from "luxon";
import Masonry from "masonry-layout";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { AxiosClient } from "../../HTTPClient";
import "./certificates.sass";
import { CertCont } from "./items/cert.card";
import { Certificate, ICertificate } from "./items/data/types/Certificate";

export const CertificatePage = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom className="extra-padded title">
        Certifications
      </Typography>
      <Container className="root-content certificate-container">
        <Suspense fallback={<CgSpinner />}>
          <CertificateBoard />
        </Suspense>
      </Container>
    </>
  );
};

const CertificateBoard = () => {
  const [certs, setCerts] = useState<React.ReactElement[]>([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _msnry = new Masonry(".creds-container", {
      columnWidth: 520,
      itemSelector: ".certificate",
      gutter: 20,
      horizontalOrder: true,
      fitWidth: true,
    });
  }, [certs]);

  const handleResponse = (res: AxiosResponse) => {
    setCerts([]);
    res.data.reverse().forEach((element: ICertificate, index: number) => {
      let key: string = element.name + element.issuedate;
      key = Buffer.from(key, "binary").toString("base64");
      if (element.include) {
        const val: Certificate = {
          ...element,
          issuedate: DateTime.fromFormat(element.issuedate, "yyyy-MM-dd"),
          expirydate: element.expirydate
            ? DateTime.fromFormat(element.expirydate, "yyyy-MM-dd")
            : undefined,
        };
        setCerts((certs) => [
          <CertCont value={val} index={index} key={key} />,
          ...certs,
        ]);
      }
    });
  };

  const dataFetch = useCallback(() => {
    AxiosClient().get("cert.list.json").then(handleResponse);
  }, []);

  useEffect(() => {
    dataFetch();
  }, [dataFetch]);

  return <Container className="creds-container">{certs}</Container>;
};
