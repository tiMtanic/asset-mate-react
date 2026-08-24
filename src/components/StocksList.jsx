import React, { useEffect, useState } from "react";
import { getEodTicks, getStocks } from "../services/assetMateApi";
import { Link } from "react-router-dom";

function StocksList() {
  const [stocks, setStocks] = useState([]);
  const [recentPriceData, setRecentPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateStocksList();
  }, []);

  useEffect(() => {}, [stocks]);

  const updateStocksList = async () => {
    try {
      setIsLoading(true);
      const stocksList = await getStocks();
      setStocks(stocksList);

      const priceData = await Promise.all(
        stocksList.map((stock) => getRecentPriceData(stock.id)),
      );

      setRecentPriceData(priceData);
      setIsLoading(false);
    } catch (error) {
      // TODO: proper error handling
      console.log(error);
    }
  };

  const getRecentPriceData = async (stockId) => {
    const response = await getEodTicks(stockId, 2);
    return response.data;
  };

  const calculatePriceDifference = (priceDataIndex) => {
    const priceToday = recentPriceData[priceDataIndex][0]?.close;
    const priceYesterday = recentPriceData[priceDataIndex][1]?.close;

    if (priceToday == null || priceYesterday == null) {
      return null;
    }

    return ((priceToday - priceYesterday) / (priceYesterday / 100)).toFixed(2);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="stocks-list">
          {stocks.map((stock, i) => {
            const priceDifference = calculatePriceDifference(i);

            return (
              <Link key={stock.id} to={`/stocks/${stock.id}`}>
                <div className="stocks-list-entry">
                  {/* <img src={stock.logoUrl} /> */}
                  <p>{stock.companyName}</p>
                  <div className="price-details">
                    <p className="current-price">${recentPriceData[i][0]?.close}</p>
                    <p className={priceDifference > 0 ? "positive" : "negative"}>
                      {priceDifference > 0
                        ? `+${priceDifference}`
                        : priceDifference}%
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default StocksList;
