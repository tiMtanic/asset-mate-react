import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import logoImage from "../assets/images/logo.png";
import { Typography } from "@mui/material";
import SearchBox from "./SearchBox";

function Navbar({ handleClickMenuButton }) {
  return (
    <AppBar>
      <Toolbar>
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src={logoImage}
            alt="Logo"
            sx={{
              height: 32,
              width: "auto",
            }}
          />
          <Typography
            component="span"
            sx={{
              fontSize: "36px",
              mt: "3px",
              fontWeight: 300,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            Asset Mate
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <SearchBox />
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleClickMenuButton}
          sx={{
            display: {
              xs: "flex",
              lg: "none",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
