import React from "react";
import { Drawer } from "@mui/material";
import { NavBar } from "./nav-bar/nav-bar";
import { Details } from "./details/details";
import "./App.sass";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
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

  onHamburgerClick = () => {
    this.setState({
      ariaHidden: !this.state.ariaHidden,
    });
  };

  onChevronClick = () => {
    this.setState({
      ariaHidden: false,
    });
  };

  render() {
    return (
      <>
        <div className="App">
          <Header hamClick={this.onHamburgerClick.bind(this)} />
          <Drawer anchor="left" variant="permanent" className="Drawer">
            <NavBar toolbar={<DrawerToolbar />} />
          </Drawer>
          <Details />
          <Footer />
          <Drawer
            anchor="left"
            variant="persistent"
            className="second-drawer"
            open={this.state.ariaHidden.valueOf()}
            onClose={this.onChevronClick}
            PaperProps={{ className: "custom-elevation" }}
          >
            <NavBar
              toolbar={
                <DrawerToolbar handler={this.onChevronClick.bind(this)} />
              }
              clickHandler={this.onChevronClick.bind(this)}
            />
          </Drawer>
        </div>
      </>
    );
  }
}
