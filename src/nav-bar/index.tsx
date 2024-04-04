import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link, useMatch } from "react-router-dom";
import "./index.sass";

type PropType = {
  toolbar: React.ReactElement;
  clickHandler?: () => void;
};

export const NavBar = (props: PropType) => {
  return (
    <Box className="navbar">
      {props.toolbar}
      <List component="div">
        <Divider />
        <Item to="/" label="Home" clickHandler={props.clickHandler} />
        <Divider />
        <Item to="/edu" label="Education" clickHandler={props.clickHandler} />
        <Divider />
        <Item to="/exp" label="Experience" clickHandler={props.clickHandler} />
        <Divider />
        <Item
          to="/certs"
          label="Certifications"
          clickHandler={props.clickHandler}
        />
        <Divider />
        <Item to="/skills" label="Skills" clickHandler={props.clickHandler} />
        <Divider />
        <Item
          to="/interests"
          label="Interests"
          clickHandler={props.clickHandler}
        />
        <Divider />
      </List>
    </Box>
  );
};

type ItemProps = {
  label: string;
  to: string;
  clickHandler?: () => void;
};

function Item(props: Readonly<ItemProps>) {
  let match = useMatch({
    path: props.to,
  });

  let x = () => {
    if (match == null) return "menutext";
    return match ? "selected menutext" : "menutext";
  };

  return (
    <ListItem
      onClick={props.clickHandler}
      component={Link}
      to={props.to}
      className={x()}
    >
      <ListItemButton>
        <ListItemText primary={props.label} />
      </ListItemButton>
    </ListItem>
  );
}
