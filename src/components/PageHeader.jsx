import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

function PageHeader({ children, icon: Icon, title, caption }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: {
          xs: "flex-start",
          sm: "center",
        },
        justifyContent: "space-between",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        gap: 2,
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 3,
            bgcolor: "action.selected",
            color: "primary.main",
            flexShrink: 0,
          }}
        >
          <Icon />
        </Box>
        <Box>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {caption}
          </Typography>
        </Box>
      </Box>
      {children}
    </Box>
  );
}

export default PageHeader;
