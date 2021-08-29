import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import "./NavBar.sass";

type PropType = {
  toolbar: React.ReactElement;
  clickHandler?: () => void;
};

export class NavBar extends React.Component<PropType> {
  render() {
    return (
      <div className="Navbar">
        {this.props.toolbar}
        <List component="div">
          <Divider />
          <Item
            activeOnlyWhenExact={true}
            to="/"
            label="Home"
            clickHandler={this.props.clickHandler}
          />
          <Divider />
          <Item
            to="/edu"
            label="Education"
            clickHandler={this.props.clickHandler}
          />
          <Divider />
          <Item
            to="/exp"
            label="Experience"
            clickHandler={this.props.clickHandler}
          />
          <Divider />
          <Item
            to="/certs"
            label="Certifications"
            clickHandler={this.props.clickHandler}
          />
          <Divider />
          <Item
            to="/skills"
            label="Skills"
            clickHandler={this.props.clickHandler}
          />
          <Divider />
          <Item
            to="/interests"
            label="Interests"
            clickHandler={this.props.clickHandler}
          />
          <Divider />
        </List>
      </div>
    );
  }
}

type ItemProps = {
  label: string;
  to: string;
  activeOnlyWhenExact?: boolean;
  clickHandler?: () => void;
};

function Item(props: ItemProps) {
  let match = useRouteMatch({
    path: props.to,
    exact: props.activeOnlyWhenExact,
  });

  let x = () => {
    if (match == null) return false;
    return match ? true : false;
  };

  return (
    <ListItem
      button
      onClick={props.clickHandler}
      component={Link}
      to={props.to}
      selected={x()}
    >
      <ListItemText primary={props.label} />
    </ListItem>
  );
}
