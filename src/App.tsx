import React from "react";

import { NavBar } from "./nav-bar/nav-bar.component";
import { Details } from "./details/details.component";
import { Drawer } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";

import "./App.sass";

function App() {
  return (
    <div className="App">
      <Drawer variant="permanent" className="Drawer">
        <Toolbar />
        <NavBar />
      </Drawer>
      <div className="content">
        <Details />
      </div>
    </div>
  );
}

export default App;
