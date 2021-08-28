import React from "react";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import "./Header.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PropType = {
  hamClick: () => void;
};

export class Header extends React.Component<PropType> {
  render() {
    return (
      <AppBar position="fixed" className="AppBar">
        <Toolbar>
          <IconButton onClick={this.props.hamClick} className="ham-icon" >
            <FontAwesomeIcon icon={["fas", "hamburger"]} color="white" />
          </IconButton>
          Curriculum Vitae
        </Toolbar>
      </AppBar>
    );
  }
}
