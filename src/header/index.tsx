import React from "react";
import { AppBar, Container, IconButton, Toolbar } from "@mui/material";
import "./index.sass";
import { FaHamburger } from "react-icons/fa";

type PropType = {
  hamClick: () => void;
};

export class Header extends React.Component<PropType> {
  render() {
    return (
      <AppBar position="fixed" className="AppBar">
        <Toolbar className="header-toolbar">
          <Container className="header-details">Curriculum Vitae</Container>
          <IconButton
            onClick={this.props.hamClick}
            className="ham-icon"
            size="large"
          >
            <FaHamburger color="white" aria-label="Navigation Menu" />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
