import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

import "./Header.sass";

export class Header extends React.Component {
  render() {
    return (
      <AppBar position="fixed" className="AppBar">
        <Toolbar>Hello</Toolbar>
      </AppBar>
    );
  }
}
