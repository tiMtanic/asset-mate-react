import { alpha, createTheme } from "@mui/material/styles";

export const drawerWidth = 260;

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#079A36",
          light: "#35B85E",
          dark: "#06752A",
          contrastText: "#FFFFFF",
        },

        secondary: {
          main: "#536987",
          light: "#7487A0",
          dark: "#374A64",
          contrastText: "#FFFFFF",
        },

        success: {
          main: "#079A36",
          light: "#E8F7EC",
          dark: "#06752A",
        },

        error: {
          main: "#F04438",
          light: "#FDECEA",
          dark: "#B42318",
        },

        warning: {
          main: "#F26B21",
          light: "#FFF0E6",
          dark: "#C54F10",
        },

        info: {
          main: "#536987",
        },

        background: {
          default: "#F7F8FA",
          paper: "#FFFFFF",
        },

        text: {
          primary: "#101828",
          secondary: "#52647E",
        },

        divider: "#E3E8EF",

        action: {
          hover: "rgba(16, 24, 40, 0.04)",
          selected: "rgba(7, 154, 54, 0.08)",
          focus: "rgba(7, 154, 54, 0.12)",
          disabled: "rgba(16, 24, 40, 0.35)",
          disabledBackground: "rgba(16, 24, 40, 0.08)",
        },
      },
    },

    dark: {
      palette: {
        primary: {
          main: "#32C85A",
          light: "#63DD82",
          dark: "#1D9E42",
          contrastText: "#07130A",
        },

        secondary: {
          main: "#A7B5C8",
          light: "#C6D0DC",
          dark: "#7E8FA7",
          contrastText: "#0D141C",
        },

        success: {
          main: "#32C85A",
          light: "#163D23",
          dark: "#23A447",
        },

        error: {
          main: "#FF6259",
          light: "#45211F",
          dark: "#D9443C",
        },

        warning: {
          main: "#FF8A3D",
          light: "#452B1A",
          dark: "#DC6B22",
        },

        info: {
          main: "#9AAEC8",
        },

        background: {
          default: "#0B1117",
          paper: "#111820",
        },

        text: {
          primary: "#F1F5F9",
          secondary: "#9EADC0",
        },

        divider: "#26323E",

        action: {
          hover: "rgba(255, 255, 255, 0.05)",
          selected: "rgba(50, 200, 90, 0.12)",
          focus: "rgba(50, 200, 90, 0.16)",
          disabled: "rgba(255, 255, 255, 0.32)",
          disabledBackground: "rgba(255, 255, 255, 0.08)",
        },
      },
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    h6: {
      fontWeight: 600,
    },

    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: "transparent",
        position: "sticky",
      },

      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: "none",

          backgroundColor: alpha(
            theme.palette.background.paper,
            0.8
          ),

          backdropFilter: "blur(4px) saturate(180%)",
          WebkitBackdropFilter: "blur(4px) saturate(180%)",

          color: theme.palette.text.primary,

          borderBottom: `1px solid ${alpha(
            theme.palette.divider,
            1
          )}`,

          zIndex: theme.zIndex.drawer + 1,
        }),
      },
    },

    MuiDrawer: {
      defaultProps: {
        slotProps: {
          backdrop: {
            sx: {
              top: {
                xs: "56px",
                sm: "64px",
              },

              backgroundColor: "rgba(0, 0, 0, 0.18)",
            },
          },
        },
      },

      styleOverrides: {
        paper: ({ theme }) => ({
          width: drawerWidth,
          boxSizing: "border-box",

          top: "56px",
          height: "calc(100% - 56px)",

          [theme.breakpoints.up("sm")]: {
            top: "64px",
            height: "calc(100% - 64px)",
          },

          backgroundImage: "none",

          backgroundColor: alpha(
            theme.palette.background.paper,
            0.7
          ),

          backdropFilter: "blur(8px) saturate(180%)",
          WebkitBackdropFilter: "blur(8px) saturate(180%)",

          borderRight: `1px solid ${alpha(
            theme.palette.divider,
            1
          )}`,
        }),
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 12,

          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 8px rgba(0, 0, 0, 0.22)"
              : "0 2px 8px rgba(16, 24, 40, 0.06)",

          backgroundImage: "none",
        }),
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,

          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
            color: theme.palette.primary.main,

            "& .MuiListItemIcon-root": {
              color: theme.palette.primary.main,
            },
          },

          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.action.selected,
          },
        }),
      },
    },
  },
});

export default theme;