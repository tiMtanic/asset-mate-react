import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import StocksListPage from "./pages/StocksListPage";
import StockPage from "./pages/StockPage";
import AddEditStockPage from "./pages/AddEditStockPage";
import WatchlistPage from "./pages/WatchlistPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <p>Hello World!</p>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/stocks" element={<StocksListPage />} />
        <Route path="/stocks/:stockId" element={<StockPage />} />
        <Route path="/stocks/:stockId/edit" element={<AddEditStockPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
