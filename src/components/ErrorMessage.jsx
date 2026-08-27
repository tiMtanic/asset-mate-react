import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

function ErrorMessage({ message }) {
  return (
    message && (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
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

            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#FF62591F" : "#F044381A",

            color: "error.main",
            flexShrink: 0,
          }}
        >
          <ErrorOutlineRoundedIcon />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              lineHeight: 1.2,
              color: "error.main",
            }}
          >
            Something went wrong
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {message}
          </Typography>
        </Box>
      </Box>
    )
  );
}

export default ErrorMessage;
