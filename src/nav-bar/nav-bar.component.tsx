import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { List, ListItem, ListItemText } from "@material-ui/core";

import "./NavBar.sass";

export function NavBar() {
  return (
    <div className="Navbar">
      <List>
        <Item activeOnlyWhenExact={true} to="/" label="Home" />
        <Item to="/edu" label="Education" />
        <Item to="/work" label="Work Experience" />
        <Item to="/certs" label="Certifications" />
        <Item to="/skills" label="Skills" />
        <Item to="/interests" label="Interests" />
      </List>
    </div>
  );
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
    <div className={match ? "active" : ""}>
      <ListItem button component={Link} to={to} selected={x()}>
        <ListItemText primary={label} />
      </ListItem>
    </div>
  );
}
