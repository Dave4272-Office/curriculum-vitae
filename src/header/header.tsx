import React from "react";
import { AppBar, Container, IconButton, Toolbar } from "@material-ui/core";
import "./Header.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PropType = {
  hamClick: () => void;
};

export class Header extends React.Component<PropType> {
  render() {
    return (
      <AppBar position="fixed" className="AppBar">
        <Toolbar className="header-toolbar" >
          <Container className="header-details" >
          Curriculum Vitae
          </Container>
          <IconButton onClick={this.props.hamClick} className="ham-icon">
            <FontAwesomeIcon icon={["fas", "hamburger"]} color="white" />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
