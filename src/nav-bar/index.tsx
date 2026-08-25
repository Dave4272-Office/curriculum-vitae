"use client";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Item(props: Readonly<ItemProps>) {
  const pathname = usePathname();
  const match = isActivePath(pathname, props.to);

  const x = () => {
    if (!match) return "menutext";
    return match ? "selected menutext" : "menutext";
  };

  return (
    <ListItem
      onClick={props.clickHandler}
      component={Link}
      href={props.to}
      className={x()}
    >
      <ListItemButton>
        <ListItemText primary={props.label} />
      </ListItemButton>
    </ListItem>
  );
}
