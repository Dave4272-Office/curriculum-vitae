"use client";

import { Box, Container, Drawer, Toolbar } from "@mui/material";
import { useState } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { NavBar } from "./nav-bar";
import { DrawerToolbar } from "./nav-bar/toolbar";

export const App = ({ children }: { children: React.ReactNode }) => {
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
      <Container className="app-container" maxWidth="xl">
        <Toolbar />
        {children}
      </Container>
      <Footer />
      <Box
        className="backdrop-second-drawer"
        sx={{ visibility: ariaHidden ? "visible" : "hidden" }}
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
