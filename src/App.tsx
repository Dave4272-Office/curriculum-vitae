import React from "react";
import { Drawer } from "@material-ui/core";
import { NavBar } from "./nav-bar/nav-bar.component";
import { Details } from "./details/details.component";
import "./App.sass";
import { Header } from "./header/header.component";
import "./fa-icon.library";
import { Footer } from "./footer/footer.component";
import { DrawerToolbar } from "./nav-bar/toolbar.component";

type StateType = {
  ariaHidden: boolean;
  secondDrawerClassName: HamDrawerClassName;
};

type HamDrawerClassName = "Ham-Drawer" | "Ham-Drawer-visible";

export class App extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      ariaHidden: false,
      secondDrawerClassName: "Ham-Drawer",
    };
  }

  onHamburgerClick = () => {
    this.setState((state) => {
      return {
        ariaHidden: true,
        secondDrawerClassName: "Ham-Drawer-visible",
      };
    });
  };

  onChevronClick = () => {
    this.setState((state) => {
      return {
        ariaHidden: false,
        secondDrawerClassName: "Ham-Drawer",
      };
    });
  };

  render() {
    return (
      <>
        <div className="App" aria-hidden={this.state.ariaHidden}>
          <Header hamClick={this.onHamburgerClick.bind(this)} />
          <Drawer variant="permanent" className="Drawer">
            <NavBar toolbar={<DrawerToolbar />} />
          </Drawer>
          <Details />
          <Footer />
        </div>
        <Drawer
          variant="permanent"
          className={"second-drawer " + this.state.secondDrawerClassName}
        >
          <NavBar toolbar={<DrawerToolbar handler={this.onChevronClick.bind(this)} />} clickHandler={this.onChevronClick.bind(this)} />
        </Drawer>
      </>
    );
  }
}
