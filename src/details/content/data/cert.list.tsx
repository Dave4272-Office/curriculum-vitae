import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { DateTime } from "luxon";
import React from "react";

export let certDetails: React.ReactElement[] = [];

type Certificate = {
  include: boolean;
  name: string;
  issuer: string;
  issuericon: string;
  issuedate: DateTime;
  expirydate: null | DateTime;
  certid: null | string;
  credurl: string;
};

const certList: Certificate[] = [
  {
    include: true,
    name: "MTA: HTML5 Application Development Fundamentals - Certified 2018",
    issuer: "Microsoft",
    issuericon: "static/logos/third-party/Microsoft.png",
    issuedate: DateTime.local(2018, 1, 11),
    expirydate: null,
    certid: null,
    credurl:
      "https://www.credly.com/badges/ce98fb09-d34f-4d38-b10d-f0f996a83c50/public_url",
  },
  {
    include: true,
    name: "Introduction to Git for Data Science",
    issuer: "DataCamp",
    issuericon: "static/logos/third-party/DataCamp.png",
    issuedate: DateTime.local(2018, 6, 7),
    expirydate: null,
    certid: "5208174",
    credurl:
      "https://www.datacamp.com/statement-of-accomplishment/course/2288a86bccc6dac87de35445a748344c1a5cd44b",
  },
  {
    include: true,
    name: "Docker Essentials: A Developer Introduction",
    issuer: "IBM",
    issuericon: "static/logos/third-party/IBM.png",
    issuedate: DateTime.local(2019, 4, 3),
    expirydate: null,
    certid: null,
    credurl:
      "https://www.credly.com/badges/75bbe476-8227-475c-9bb9-042a4356404e/public_url",
  },
  {
    include: true,
    name: "MTA: Introduction to Programming Using Python - Certified 2019",
    issuer: "Microsoft",
    issuericon: "static/logos/third-party/Microsoft.png",
    issuedate: DateTime.local(2019, 7, 13),
    expirydate: null,
    certid: null,
    credurl:
      "https://www.credly.com/badges/073eaa44-09ba-41f0-81d1-1a5b00ec2677/public_url",
  },
];

certList
  .filter((value) => {
    return value.include;
  })
  .reverse()
  .forEach((value, index) => {
    certDetails.push(
      <Box width={520} height={270} key={index} >
        <Card className="cert-card">
          <CardContent className="cert-content">
            <Grid container className="cert-item">
              <Grid container>
                <Grid item container xs className="cert-detail">
                  <Grid item>
                    <Typography variant="h5" align="center" gutterBottom>
                      {value.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      <FontAwesomeIcon
                        icon={["fas", "certificate"]}
                        color="#75e900"
                      />
                      &nbsp;&nbsp;{value.issuer}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" gutterBottom>
                      {value.issuedate.toFormat("MMMM d, yyyy")}
                      {value.expirydate === null
                        ? ""
                        : " — " + value.expirydate.toFormat("MMMM d, yyyy")}
                    </Typography>
                  </Grid>
                  <CertID value={value} />
                </Grid>
              </Grid>
              <Divider variant="fullWidth" className="cert-desc-divider" />
              <Grid item className="cred-chip">
                <Chip
                  label="Credential"
                  variant="outlined"
                  color="secondary"
                  clickable
                  component="a"
                  href={value.credurl}
                  target="_blank"
                  rel="noreferrer noopener"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardMedia image={value.issuericon} className="cert-org-icon" />
        </Card>
        <FontAwesomeIcon
          icon={["fas", "award"]}
          color="red"
          className="cert-icon"
        />
      </Box>
    );
  });

function CertID(props: { value: Certificate }) {
  if (props.value.certid !== null) {
    return (
      <Grid item>
        <Typography variant="body1" gutterBottom>ID : {props.value.certid}</Typography>
      </Grid>
    );
  } else {
    return <></>;
  }
}
