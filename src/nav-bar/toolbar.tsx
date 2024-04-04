import { Box, IconButton, Toolbar } from "@mui/material";
import { FaChevronCircleLeft } from "react-icons/fa";

type PropType = {
  handler?: () => void;
};

export const DrawerToolbar = (props: PropType) => {
  if (!props.handler) {
    return (
      <Toolbar disableGutters>
        <Box>Image</Box>
      </Toolbar>
    );
  } else {
    return (
      <Toolbar disableGutters>
        <Box className="drawer-logo-container">Image</Box>
        <IconButton onClick={props.handler} size="large">
          <FaChevronCircleLeft color="pink" />
        </IconButton>
      </Toolbar>
    );
  }
};
