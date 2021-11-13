import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { certList } from "./data/cert.list";
import { Certificate } from "./data/types/Certificate";

export let certCards: React.ReactElement[] = [];

type PropType = {
  index: number;
  value: Certificate;
  length: number;
};

type StateType = {
  height: number[];
};

class CertCont extends React.Component<PropType, StateType> {
  textInput: React.RefObject<any>;

  constructor(props: PropType | Readonly<PropType>) {
    super(props);

    this.textInput = React.createRef();
  }

  componentDidMount() {
    let dom = document.getElementById("certificate" + this.props.index)
    if(dom){
      dom.style.height = Number(this.textInput.current.clientHeight).toString() + "px";
    }
    console.log(this.textInput.current.clientHeight);
  }

  render() {
    let value = this.props.value;
    return (
      <div id={"certificate" + this.props.index} key={this.props.index} className="certificate">
        <Card className="cert-card" ref={this.textInput}>
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
      </div>
    );
  }
}

let filteredCertList = certList.filter((value) => {
  return value.include;
});

filteredCertList.reverse().forEach((value, index) => {
  certCards.push(
    <CertCont length={filteredCertList.length} value={value} index={index} key={index} />
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
