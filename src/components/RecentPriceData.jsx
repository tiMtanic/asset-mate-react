import React, { useEffect, useState } from "react";
import { getEodTicks } from "../services/assetMateApi";
import ListItemChart from "./ListItemChart";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

function RecentPriceData({ stockId }) {
  const [recentPriceData, setRecentPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getRecentPriceData();
  }, [stockId]);

  const getRecentPriceData = async () => {
    try {
      const response = await getEodTicks(stockId, 30);
      setRecentPriceData(response.data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Error loading price data!");
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
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {errorMessage ? (
            <Typography sx={{ color: "error.main", fontSize: 14 }}>
              {errorMessage}
            </Typography>
          ) : (
            <>
              <Skeleton variant="text" width={70} height={28} />
              <Skeleton variant="text" width={55} height={28} />
              <Skeleton variant="rounded" width={48} height={24} />
            </>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            whiteSpace: "nowrap",
          }}
        >
          {recentPriceData[0] != null && (
            <Typography variant="body2" fontWeight={600}>
              ${recentPriceData[0].close.toFixed(2)}
            </Typography>
          )}
          {priceDifference != null && (
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{
                color: priceDifference > 0 ? "success.main" : "error.main",
              }}
            >
              {priceDifference > 0 ? `+${priceDifference}` : priceDifference}%
            </Typography>
          )}
          <Box
            sx={{
              width: 48,
              height: 24,
              flexShrink: 0,
            }}
          >
            <ListItemChart data={recentPriceData} height={24} />
          </Box>
        </Box>
      )}
    </>
  );
}

export default RecentPriceData;
