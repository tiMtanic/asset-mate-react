import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addWatchlistEntry, deleteWatchlistEntry, getStock, getWatchlistEntry } from "../services/assetMateApi";

function StockDetails() {
  const [stock, setStock] = useState(null);
  const [watchlistId, setWatchlistId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {stockId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadStockData();
  }, []);

  useEffect(() => {
    loadWatchlistData();
  }, [stock]);

  const loadStockData = async () => {
    try {
      setIsLoading(true);
      setStock(await getStock(stockId));
      setIsLoading(false);
    } catch (error) {
      // TODO: add proper error handling
      console.log(error);
    }
  };

  const loadWatchlistData = async () => {
    try {
      const result = await getWatchlistEntry(stock.id);
      setWatchlistId(result[0]?.id);
    } catch (error) {
      // TODO: proper error handling
      console.log(error);
    }
  };

  const handleWatchListAddRemove = async () => {
    try {
      if (watchlistId) {
        await deleteWatchlistEntry(watchlistId);
        setWatchlistId(null);
      } else {
        const result = await addWatchlistEntry(stock.id);
        setWatchlistId(result.id);
      }
    } catch (error) {
      // TODO: proper error handling
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div id="stock-details">
          <h1>{stock.companyName}</h1>
          <div className="stock-actions">
            <button onClick={() => navigate(`/stocks/${stock.id}/edit`)}>Edit Stock</button>
            <button onClick={handleWatchListAddRemove}>{watchlistId ? "Remove from " : "Add to "}Watchlist</button>
          </div>
          <div className="stock-about">
            <h3>About the Company</h3>
            <p>{stock.description}</p>
          </div>
          <div className="stock-info">
            <h3>Details</h3>
            <p><span className="info-label">Name:</span><span>{stock.companyName}</span></p>
            <p><span className="info-label">Ticker Symbol:</span><span>{stock.tickerSymbol}</span></p>
            <p><span className="info-label">Founded in:</span><span>{stock.foundedYear}</span></p>
            <p><span className="info-label">Employees:</span><span>{stock.employeesCount}</span></p>
            <p><span className="info-label">Location:</span><span>{stock.location}</span></p>
            <p><span className="info-label">Website:</span><span><a href={stock.websiteUrl} target="_blank">{stock.websiteUrl}</a></span></p>
          </div>
        </div>
      )}
    </>
  );
}

export default StockDetails;
