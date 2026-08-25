import React, { useEffect, useState } from "react";
import { getEodTicks } from "../services/assetMateApi";
import ListItemChart from "./ListItemChart";

function RecentPriceData({stockId}) {
  const [recentPriceData, setRecentPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRecentPriceData();
  }, [stockId]);

  const getRecentPriceData = async () => {
    try {
      const response = await getEodTicks(stockId, 30);
      setRecentPriceData(response.data);
      setIsLoading(false);
    } catch (error) {
      // TODO: proper error handling
      console.log(error);
    }
  };

  const calculatePriceDifference = () => {
    const priceToday = recentPriceData[0]?.close;
    const priceYesterday = recentPriceData[1]?.close;

    if (priceToday == null || priceYesterday == null || priceYesterday === 0) {
      return null;
    }

    return (((priceToday - priceYesterday) / priceYesterday) * 100).toFixed(2);
  };

  const priceDifference = calculatePriceDifference();

  return (
    <>
      {isLoading ? <p>Loading...</p> :
      <div className="price-details">
        {recentPriceData[0] != null && <p className="current-price">${recentPriceData[0]?.close.toFixed(2)}</p>}
        {priceDifference != null && (
        <p className={priceDifference > 0 ? "positive" : "negative"}>
          {priceDifference > 0 ? `+${priceDifference}` : priceDifference}%
        </p> )}
        <div style={{width: "48px"}}>
          <ListItemChart data={recentPriceData} height={24} />
        </div>
      </div>
      }
    </>
  );
}

export default RecentPriceData;
