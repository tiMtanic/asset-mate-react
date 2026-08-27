import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useColorScheme } from "@mui/material/styles";

function ColorModeButton() {
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const activeMode = mode === "system" ? systemMode : mode;
  const isDark = activeMode === "dark";

  const handleToggle = () => {
    setMode(isDark ? "light" : "dark");
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleToggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: "inherit",
          }}
        >
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </ListItemIcon>
        <ListItemText primary={isDark ? "Light mode" : "Dark mode"} />
      </ListItemButton>
    </ListItem>
  );
}

export default ColorModeButton;
