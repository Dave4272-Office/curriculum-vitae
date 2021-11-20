import React from "react";
import { Box, Drawer } from "@mui/material";
import { NavBar } from "./nav-bar";
import { Details } from "./details";
import "./App.sass";
import { Header } from "./header";
import { Footer } from "./footer";
import { DrawerToolbar } from "./nav-bar/toolbar";

type StateType = {
  ariaHidden: boolean;
};

export class App extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      ariaHidden: false,
    };
  }

  openDrawer = () => {
    this.setState({
      ariaHidden: true,
    });
  };

  closeDrawer = () => {
    this.setState({
      ariaHidden: false,
    });
  };

  render() {
    return (
      <>
        <div className="App">
          <Header hamClick={this.openDrawer.bind(this)} />
          <Drawer anchor="left" variant="permanent" className="drawer">
            <NavBar toolbar={<DrawerToolbar />} />
          </Drawer>
          <Details />
          <Footer />
          <Box
            className="backdrop-second-drawer"
            visibility={this.state.ariaHidden.valueOf() ? "visible" : "hidden"}
            onClick={this.closeDrawer.bind(this)}
          ></Box>
          <Drawer
            anchor="left"
            variant="persistent"
            className="second-drawer"
            open={this.state.ariaHidden.valueOf()}
            onClose={this.closeDrawer}
          >
            <NavBar
              toolbar={
                <DrawerToolbar handler={this.closeDrawer.bind(this)} />
              }
              clickHandler={this.closeDrawer.bind(this)}
            />
          </Drawer>
        </div>
      </>
    );
  }
}
