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
import { useState } from "react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar handleClickMenuButton={() => setIsMenuOpen(!isMenuOpen)} />
      {isMenuOpen && <Menu handleOnNavigate={() => setIsMenuOpen(false)} />}
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/stocks" element={<StocksListPage />} />
          <Route path="/stocks/:stockId" element={<StockPage />} />
          <Route path="/stocks/:stockId/edit" element={<AddEditStockPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
