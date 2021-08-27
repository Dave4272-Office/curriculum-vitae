import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Toolbar } from "@material-ui/core";
import React from "react";

type PropType = {
  handler?: () => void;
};

export class DrawerToolbar extends React.Component<PropType> {
  render() {
    if (!this.props.handler) {
      return (
        <Toolbar>
          <Box>Image</Box>
        </Toolbar>
      );
    } else {
      return (
        <Toolbar>
          <Box>Image</Box>
          <IconButton onClick={this.props.handler} >
            <FontAwesomeIcon icon={["fas", "chevron-circle-left"]} />
          </IconButton>
        </Toolbar>
      );
    }
  }
}
