import React from "react";
import StocksList from "../components/StocksList";
import { useNavigate } from "react-router-dom";

function StocksListPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Stocks</h1>
      <StocksList />
      <button className="add-stock-button" onClick={() => navigate("/stocks/add")}>Add Stock</button>
    </>
  );
}

export default StocksListPage;
