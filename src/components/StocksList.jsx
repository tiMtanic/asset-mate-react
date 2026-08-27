import { useEffect, useState } from "react";
import { getStocks } from "../services/assetMateApi";
import { Link } from "react-router-dom";
import RecentPriceData from "./RecentPriceData";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ErrorMessage from "./ErrorMessage";

function StocksList({ displayMode, limit }) {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      setIsLoading(true);
      let result = await getStocks();

      if (displayMode) {
        if (displayMode === "gainers") {
          result = result
            .filter((stock) => stock.lastPriceChange > 0)
            .sort((a, b) => b.lastPriceChange - a.lastPriceChange)
            .slice(0, limit);
        } else if (displayMode === "losers") {
          result = result
            .filter((stock) => stock.lastPriceChange < 0)
            .sort((a, b) => a.lastPriceChange - b.lastPriceChange)
            .slice(0, limit);
        }
      }

      setStocks(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Error loading stocks list!");
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? errorMessage ? (<ErrorMessage message={errorMessage} />) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "100%",
          }}
        >
          {Array.from({ length: limit ?? 10 }).map((_, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
                boxSizing: "border-box",
                p: 2,
              }}
            >
              <Skeleton variant="text" width="35%" height={28} />
              <Box sx={{ flexGrow: 1 }} />
              <Skeleton variant="text" width={70} height={28} />
              <Skeleton variant="text" width={100} height={28} />
            </Paper>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "100%",
          }}
        >
          {stocks.map((stock) => (
            <Paper
              key={stock.id}
              component={Link}
              to={`/stocks/${stock.id}`}
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
                boxSizing: "border-box",
                p: 2,
                color: "text.primary",
                textDecoration: "none",
                transition: "background-color 0.2s, border-color 0.2s",

                "&:hover": {
                  bgcolor: "action.hover",
                  borderColor: "primary.main",
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {stock.companyName}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <RecentPriceData stockId={stock.id} />
            </Paper>
          ))}
        </Box>
      )}
    </>
  );
}

export default StocksList;
