import { useEffect, useState } from "react";
import { getEodTicks, getStocks } from "../services/assetMateApi";
import { Link } from "react-router-dom";
import RecentPriceData from "./RecentPriceData";

function StocksList({ displayMode, limit }) {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      setIsLoading(true);
      let result = await getStocks();

      if (displayMode) {
        if (displayMode === "gainers") {
          result = result.filter((stock) => stock.lastPriceChange > 0).sort((a, b) => b.lastPriceChange - a.lastPriceChange).slice(0, limit);
        } else if (displayMode === "losers") {
          result = result.filter((stock) => stock.lastPriceChange < 0).sort((a, b) => a.lastPriceChange - b.lastPriceChange).slice(0, limit);
        }
      }

      setStocks(result);
      setIsLoading(false);
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
        <div className="stocks-list">
          {stocks.map((stock) => 
            <Link key={stock.id} to={`/stocks/${stock.id}`}>
              <div className="stocks-list-entry">
                {/* <img src={stock.logoUrl} /> */}
                <p>{stock.companyName}</p>
                <RecentPriceData stockId={stock.id} />
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default StocksList;
