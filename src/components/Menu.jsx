import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ColorModeButton from "./ColorModeButton";

function Menu({ handleOnNavigate }) {
  const { pathname } = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      path: "/",
      icon: <DashboardOutlinedIcon />,
    },
    {
      text: "Stocks",
      path: "/stocks",
      icon: <ShowChartOutlinedIcon />,
    },
    {
      text: "Watchlist",
      path: "/watchlist",
      icon: <StarBorderOutlinedIcon />,
    },
    {
      text: "About",
      path: "/about",
      icon: <InfoOutlinedIcon />,
    },
  ];

  const isSelected = (path) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(path);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <List sx={{ p: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              selected={isSelected(item.path)}
              onClick={handleOnNavigate}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <ColorModeButton />
    </Box>
  );
}

export default Menu;
