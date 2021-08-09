import React from "react";
import { Drawer } from "@material-ui/core";

import { NavBar } from "./nav-bar/nav-bar.component";
import { Details } from "./details/details.component";
import "./App.sass";
import { Header } from "./header/header.component";

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Drawer variant="permanent" className="Drawer">
          <NavBar />
        </Drawer>
        <div className="content">
          <Details />
        </div>
      </div>
    );
  }
}
