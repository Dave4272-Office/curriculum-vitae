import { Box, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { FaChevronCircleLeft } from "react-icons/fa";

type PropType = {
  handler?: () => void;
};

export class DrawerToolbar extends React.Component<PropType> {
  render() {
    if (!this.props.handler) {
      return (
        <Toolbar disableGutters>
          <Box>Image</Box>
        </Toolbar>
      );
    } else {
      return (
        <Toolbar disableGutters>
          <Box className="drawer-logo-container">Image</Box>
          <IconButton onClick={this.props.handler} size="large">
            <FaChevronCircleLeft color="pink" />
          </IconButton>
        </Toolbar>
      );
    }
  }
}
