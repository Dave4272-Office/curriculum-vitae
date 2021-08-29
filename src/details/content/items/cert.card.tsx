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
import React from "react";
import { certList } from "./data/cert.list";
import { Certificate } from "./data/types/Certificate";

export let certCards: React.ReactElement[] = [];

certList
  .filter((value) => {
    return value.include;
  })
  .reverse()
  .forEach((value, index) => {
    certCards.push(
      <Box width={520} height={270} key={index}>
        <Card className="cert-card">
          <CardContent className="cert-content">
            <Grid container>
              <Grid container className="cert-item">
                <Grid container>
                  <Grid item container xs className="cert-detail">
                    <Grid item>
                      <Typography
                        variant="h5"
                        component="h3"
                        align="center"
                        gutterBottom
                      >
                        {value.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" component="h4" gutterBottom>
                        <FontAwesomeIcon
                          icon={["fas", "certificate"]}
                          color="#75e900"
                        />
                        &nbsp;&nbsp;{value.issuer}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" align="center" gutterBottom>
                        {value.issuedate.toFormat("MMMM d, yyyy")}
                        {!value.expirydate ? (
                          ""
                        ) : (
                          <>
                            <br />
                            {value.expirydate.toFormat("MMMM d, yyyy")}
                          </>
                        )}
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
                    className="cred-url"
                  />
                </Grid>
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                className="cert-logo-divider"
              />
              <CardMedia image={value.issuericon} className="cert-org-icon" />
            </Grid>
          </CardContent>
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
  if (props.value.certid) {
    return (
      <Grid item>
        <Typography variant="body1" gutterBottom>
          ID : {props.value.certid}
        </Typography>
      </Grid>
    );
  } else {
    return <></>;
  }
}
