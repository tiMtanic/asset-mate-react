import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// CSS + Theme
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.js';
import { ThemeProvider } from '@mui/material/styles';

// Roboto font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  // </StrictMode>,
);
