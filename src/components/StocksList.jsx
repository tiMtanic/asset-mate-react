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
      {isLoading ? (
        errorMessage ? (
          <ErrorMessage message={errorMessage} />
        ) : (
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
                  overflow: "hidden",
                }}
              >
                <Skeleton
                  variant="circular"
                  width={44}
                  height={44}
                  sx={{
                    flexShrink: 0,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    alignItems: {
                      xs: "stretch",
                      sm: "center",
                    },
                    gap: {
                      xs: 0.5,
                      sm: 2,
                    },
                    flexGrow: 1,
                    minWidth: 0,
                  }}
                >
                  <Skeleton
                    variant="text"
                    height={28}
                    sx={{
                      width: {
                        xs: "65%",
                        sm: "35%",
                      },
                      maxWidth: 260,
                      minWidth: 0,
                      flexShrink: 1,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      flexShrink: 0,
                      alignSelf: {
                        xs: "flex-end",
                        sm: "auto",
                      },
                      ml: {
                        xs: 0,
                        sm: "auto",
                      },
                    }}
                  >
                    <Skeleton variant="text" width={70} height={28} />
                    <Skeleton variant="text" width={60} height={28} />
                    <Skeleton variant="rounded" width={48} height={24} />
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )
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
                overflow: "hidden",
                color: "text.primary",
                textDecoration: "none",
                transition: "background-color 0.2s, border-color 0.2s",
                "&:hover": {
                  bgcolor: "action.hover",
                  borderColor: "primary.main",
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  overflow: "hidden",
                  bgcolor: "#FFFFFF",
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <Box
                  component="img"
                  src={stock.logoUrl}
                  alt={`${stock.companyName} logo`}
                  sx={{
                    width: "60%",
                    height: "60%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  alignItems: {
                    xs: "stretch",
                    sm: "center",
                  },
                  gap: {
                    xs: 0.5,
                    sm: 2,
                  },
                  flexGrow: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{
                    minWidth: 0,
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: {
                      xs: "none",
                      sm: "1 1 auto",
                    },
                  }}
                >
                  {stock.companyName}
                </Typography>

                <Box
                  sx={{
                    flexShrink: 0,
                    alignSelf: {
                      xs: "flex-end",
                      sm: "auto",
                    },
                    ml: {
                      xs: 0,
                      sm: "auto",
                    },
                  }}
                >
                  <RecentPriceData stockId={stock.id} />
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </>
  );
}

export default StocksList;
