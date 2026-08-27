import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: {
          xs: 4,
          sm: 6,
          md: 8,
        },
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 620,
        }}
      >
        <CardContent
          sx={{
            py: {
              xs: 4,
              sm: 5,
            },
            px: {
              xs: 3,
              sm: 4,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: "28px",
                bgcolor: "action.selected",
                color: "primary.main",
                flexShrink: 0,
              }}
            >
              <ErrorOutlineRoundedIcon fontSize="large" />
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 1.5,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  404 Page not found
                </Typography>
              </Box>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                The page you requested does not exist or may have been moved.
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<DashboardRoundedIcon />}
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NotFoundPage;
