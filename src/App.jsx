import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import StocksListPage from "./pages/StocksListPage";
import StockPage from "./pages/StockPage";
import AddEditStockPage from "./pages/AddEditStockPage";
import WatchlistPage from "./pages/WatchlistPage";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import { useEffect, useState } from "react";
import { Box, Container, Drawer, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const drawerWidth = 260;

  useEffect(() => {
    if (isDesktop) {
      setIsMenuOpen(false);
    }
  }, [isDesktop]);

  return (
    <>
      <ScrollToTop />
      <Box sx={{ minHeight: "100vh" }}>
        <Navbar handleClickMenuButton={() => setIsMenuOpen(!isMenuOpen)} />
        <Box
          sx={{
            display: "flex",
            minWidth: 0,

            minHeight: {
              xs: "calc(100vh - 57px)",
              sm: "calc(100vh - 65px)",
            },
          }}
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            anchor="left"
            open={isMenuOpen && !isDesktop}
            onClose={() => setIsMenuOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: {
                xs: "block",
                lg: "none",
              },
            }}
          >
            <Menu handleOnNavigate={() => setIsMenuOpen(false)} />
          </Drawer>

          {/* Desktop Navigation */}
          <Box
            component="nav"
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
              flexDirection: "column",
              width: drawerWidth,
              flexShrink: 0,
              position: "sticky",
              top: "65px",
              height: "calc(100vh - 65px)",
              alignSelf: "flex-start",
              overflowY: "auto",
              bgcolor: "background.paper",
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            <Menu />
          </Box>

          {/* Main */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              width: "100%",
            }}
          >
            <Container
              maxWidth="lg"
              sx={{
                py: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                },
              }}
            >
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/stocks" element={<StocksListPage />} />
                <Route path="/stocks/:stockId" element={<StockPage />} />
                <Route path="/stocks/add" element={<AddEditStockPage />} />
                <Route
                  path="/stocks/:stockId/edit"
                  element={<AddEditStockPage />}
                />
                <Route path="/watchlist" element={<WatchlistPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
