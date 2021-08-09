import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Toolbar,
} from "@material-ui/core";

import "./NavBar.sass";

export class NavBar extends React.Component {
  render() {
    return (
      <div className="Navbar">
        <Toolbar />
        <List>
          <Divider />
          <Item activeOnlyWhenExact={true} to="/" label="Home" />
          <Divider />
          <Item to="/edu" label="Education" />
          <Divider />
          <Item to="/work" label="Work Experience" />
          <Divider />
          <Item to="/certs" label="Certifications" />
          <Divider />
          <Item to="/skills" label="Skills" />
          <Divider />
          <Item to="/interests" label="Interests" />
          <Divider />
        </List>
      </div>
    );
  }
}

function Item({
  label,
  to,
  activeOnlyWhenExact = false,
}: {
  [key: string]: any;
}) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  let x = () => {
    if (match == null) return false;
    return match ? true : false;
  };

  return (
    <ListItem button component={Link} to={to} selected={x()}>
      <ListItemText primary={label} />
    </ListItem>
  );
}
