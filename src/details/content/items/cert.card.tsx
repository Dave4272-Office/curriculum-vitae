import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { FaAward, FaCertificate } from "react-icons/fa";
import { Certificate } from "./data/types/Certificate";

type PropType = {
  index: number;
  value: Certificate;
};

export const CertCont = (props: PropType) => {
  const textInput = React.createRef<any>();

  useEffect(() => {
    let dom = document.getElementById("certificate" + props.index);
    if (dom) {
      dom.style.height =
        Number(textInput.current.clientHeight).toString() + "px";
    }
  });

  let value = props.value;
  return (
    <div id={"certificate" + props.index} className="certificate">
      <Card className="cert-card" ref={textInput}>
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
                      <FaCertificate color="#75e900" />
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
      <FaAward color="red" className="cert-icon" />
    </div>
  );
};

function CertID(props: Readonly<{ value: Certificate }>) {
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
