import { AppBar, Container, IconButton, Toolbar } from "@mui/material";
import { FaHamburger } from "react-icons/fa";
import "./index.sass";

type PropType = {
  hamClick: () => void;
};

export const Header = (props: PropType) => {
  return (
    <AppBar position="fixed" className="app-bar">
      <Toolbar className="header-toolbar">
        <Container className="header-details">Curriculum Vitae</Container>
        <IconButton onClick={props.hamClick} className="ham-icon" size="large">
          <FaHamburger color="white" aria-label="Navigation Menu" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
