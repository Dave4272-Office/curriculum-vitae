import { Box, Drawer } from "@mui/material";
import { useState } from "react";
import "./App.sass";
import { Details } from "./details";
import { Footer } from "./footer";
import { Header } from "./header";
import { NavBar } from "./nav-bar";
import { DrawerToolbar } from "./nav-bar/toolbar";

export const App = () => {
  const [ariaHidden, setAriaHidden] = useState(false);

  const openDrawer = () => {
    setAriaHidden(true);
  };

  const closeDrawer = () => {
    setAriaHidden(false);
  };
  return (
    <div className="App">
      <Header hamClick={openDrawer.bind(this)} />
      <Drawer anchor="left" variant="permanent" className="drawer">
        <NavBar toolbar={<DrawerToolbar />} />
      </Drawer>
      <Details />
      <Footer />
      <Box
        className="backdrop-second-drawer"
        visibility={ariaHidden ? "visible" : "hidden"}
        onClick={closeDrawer.bind(this)}
      />
      <Drawer
        anchor="left"
        variant="persistent"
        className="second-drawer"
        open={ariaHidden}
        onClose={closeDrawer}
      >
        <NavBar
          toolbar={<DrawerToolbar handler={closeDrawer.bind(this)} />}
          clickHandler={closeDrawer.bind(this)}
        />
      </Drawer>
    </div>
  );
};
