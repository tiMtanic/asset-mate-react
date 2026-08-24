import { useEffect, useState } from "react";
import { getStocks } from "../services/assetMateApi";
import { Link } from "react-router-dom";
import RecentPriceData from "./RecentPriceData";

function StocksList() {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      setIsLoading(true);
      setStocks(await getStocks());
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
