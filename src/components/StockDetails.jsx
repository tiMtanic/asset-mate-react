import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addWatchlistEntry,
  deleteWatchlistEntry,
  getEodTicksByStartDate,
  getStock,
  getWatchlistEntry,
} from "../services/assetMateApi";
import Chart from "./Chart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ErrorMessage from "./ErrorMessage";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { CircularProgress } from "@mui/material";

function StockDetails() {
  const { stockId } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);
  const [watchlistId, setWatchlistId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eodTicks, setEodTicks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [chartDataErrorMessage, setChartDataErrorMessage] = useState("");
  const [chartTimeframe, setChartTimeframe] = useState("6M");
  const [isChartLoading, setIsChartLoading] = useState(true);

  useEffect(() => {
    loadStockData();
    loadEodTicks();
    loadWatchlistData();
  }, [stockId]);

  const loadStockData = async () => {
    try {
      setIsLoading(true);
      setStock(await getStock(stockId));
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      if (error.status === 404) {
        navigate("/not-found");
      } else {
        setErrorMessage("Error loading stock information!");
      }
    }
  };

  const loadEodTicks = async () => {
    try {
      const result = await getEodTicksByStartDate(
        stockId,
        getStartDateForTimeframe(chartTimeframe),
      );
      setEodTicks(result);
      setIsChartLoading(false);
    } catch (error) {
      setChartDataErrorMessage("Error loading chart data!");
      console.log(error);
    }
  };

  const loadWatchlistData = async () => {
    try {
      const result = await getWatchlistEntry(stockId);
      setWatchlistId(result[0]?.id ?? null);
    } catch (error) {
      setErrorMessage("Error loading watchlist information!");
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
      setErrorMessage("Error sending watchlist information!");
      console.log(error);
    }
  };

  const getStartDateForTimeframe = (timeframe) => {
    const date = new Date();

    switch (timeframe) {
      case "1M":
        date.setMonth(date.getMonth() - 1);
        break;
      case "6M":
        date.setMonth(date.getMonth() - 6);
        break;
      case "1Y":
        date.setFullYear(date.getFullYear() - 1);
        break;
      case "YTD":
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
        break;
      case "MAX":
        return 0;
      default:
        return 0;
    }

    return Math.floor(date.getTime() / 1000);
  };

  const handleChartTimeframeChange = async (event, newTimeframe) => {
    if (newTimeframe === null) {
      return;
    }

    setChartTimeframe(newTimeframe);
    setIsChartLoading(true);

    try {
      setChartDataErrorMessage("");
      const startDate = getStartDateForTimeframe(newTimeframe);
      const result = await getEodTicksByStartDate(stockId, startDate);
      setEodTicks(result);
      setIsChartLoading(false);
    } catch (error) {
      console.log(error);
      setChartDataErrorMessage("Error loading chart data!");
    }
  };

  const stockPriceChange =
    eodTicks.length > 1
      ? ((eodTicks[0].close - eodTicks[eodTicks.length - 1].close) /
          eodTicks[eodTicks.length - 1].close) *
        100
      : null;

  return (
    <>
      {isLoading ? (
        errorMessage ? (
          <ErrorMessage message={errorMessage} />
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <Skeleton
                variant="circular"
                width={44}
                height={44}
                sx={{ flexShrink: 0 }}
              />
              <Skeleton variant="text" width="35%" height={32} />
              <Box sx={{ flexGrow: 1 }} />
              <Skeleton variant="text" width={80} height={32} />
            </Box>
            <Box
              sx={{
                width: "100%",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: {
                      xs: "100%",
                      sm: "auto",
                    },
                  }}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rounded"
                      height={32}
                      sx={{
                        flex: {
                          xs: 1,
                          sm: "none",
                        },
                        width: {
                          xs: "auto",
                          sm: index === 3 ? 58 : 52,
                        },
                        borderRadius: 0,
                        "&:first-of-type": {
                          borderTopLeftRadius: 8,
                          borderBottomLeftRadius: 8,
                        },
                        "&:last-of-type": {
                          borderTopRightRadius: 8,
                          borderBottomRightRadius: 8,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <Skeleton
                variant="rounded"
                width="100%"
                sx={{
                  height: "auto",
                  aspectRatio: "1 / 0.65",
                  maxHeight: 500,
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexWrap: "wrap",
                gap: 1.5,
                mb: 3,
              }}
            >
              <Skeleton variant="rounded" width={140} height={40} />
              <Skeleton variant="rounded" width={140} height={40} />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Skeleton variant="text" width={180} height={32} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="85%" />
            <Divider sx={{ my: 3 }} />
            <Skeleton variant="text" width={100} height={32} sx={{ mb: 1 }} />
            {Array.from({ length: 6 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "110px minmax(0, 1fr)",
                    sm: "160px minmax(0, 1fr)",
                  },
                  columnGap: {
                    xs: 1.5,
                    sm: 2,
                  },
                  py: 1,
                }}
              >
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width={index === 5 ? "80%" : "50%"} />
              </Box>
            ))}
          </Box>
        )
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
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
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 600,
              }}
            >
              {stock.companyName}
            </Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexShrink: 0,
              }}
            >
              {stockPriceChange !== null && (
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    color:
                      stockPriceChange > 0
                        ? "success.main"
                        : stockPriceChange < 0
                          ? "error.main"
                          : "text.secondary",
                  }}
                >
                  {stockPriceChange > 0 ? "+" : ""}
                  {stockPriceChange.toFixed(2)}%
                </Typography>
              )}

              <Typography variant="h6" fontWeight={600}>
                ${stock.lastPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          {eodTicks.length > 0 && (
            <Box
              sx={{
                width: "100%",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: 2,
                }}
              >
                <ToggleButtonGroup
                  value={chartTimeframe}
                  exclusive
                  onChange={handleChartTimeframeChange}
                  size="small"
                  aria-label="Chart timeframe"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "auto",
                    },
                    "& .MuiToggleButton-root": {
                      flex: {
                        xs: 1,
                        sm: "none",
                      },
                      px: {
                        xs: 1,
                        sm: 2,
                      },
                      whiteSpace: "nowrap",
                    },
                  }}
                >
                  <ToggleButton value="1M">1M</ToggleButton>
                  <ToggleButton value="6M">6M</ToggleButton>
                  <ToggleButton value="1Y">1Y</ToggleButton>
                  <ToggleButton value="YTD">YTD</ToggleButton>
                  <ToggleButton value="MAX">Max</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <Chart data={eodTicks} />
                {isChartLoading && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(17, 24, 32, 0.65)"
                          : "rgba(255, 255, 255, 0.65)",

                      borderRadius: 2,
                      zIndex: 1,
                    }}
                  >
                    <CircularProgress size={36} />
                  </Box>
                )}
              </Box>
            </Box>
          )}
          {chartDataErrorMessage && (
            <Box sx={{ mb: 2 }}>
              <ErrorMessage message={chartDataErrorMessage} />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              gap: 1.5,
              mb: 3,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<EditRoundedIcon />}
              onClick={() => navigate(`/stocks/${stock.id}/edit`)}
              sx={{
                minWidth: 140,
              }}
            >
              Edit Stock
            </Button>
            <Tooltip
              title={watchlistId ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              <Button
                variant={watchlistId ? "outlined" : "contained"}
                startIcon={
                  watchlistId ? <StarRoundedIcon /> : <StarBorderRoundedIcon />
                }
                onClick={handleWatchListAddRemove}
                aria-label={
                  watchlistId ? "Remove from Watchlist" : "Add to Watchlist"
                }
                sx={{
                  minWidth: 140,
                }}
              >
                Watchlist
              </Button>
            </Tooltip>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box>
            <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
              About the Company
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.7,
              }}
            >
              {stock.description}
            </Typography>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Details
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "110px minmax(0, 1fr)",
                  sm: "160px minmax(0, 1fr)",
                },
                columnGap: {
                  xs: 1.5,
                  sm: 2,
                },
              }}
            >
              <Typography color="text.secondary" sx={{ py: 1 }}>
                Name
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  minWidth: 0,
                }}
              >
                {stock.companyName}
              </Typography>
              <Typography color="text.secondary" sx={{ py: 1 }}>
                Ticker Symbol
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  minWidth: 0,
                }}
              >
                {stock.tickerSymbol}
              </Typography>
              <Typography color="text.secondary" sx={{ py: 1 }}>
                Founded
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  minWidth: 0,
                }}
              >
                {stock.foundedYear}
              </Typography>
              <Typography color="text.secondary" sx={{ py: 1 }}>
                Employees
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  minWidth: 0,
                }}
              >
                {stock.employeesCount}
              </Typography>
              <Typography color="text.secondary" sx={{ py: 1 }}>
                Location
              </Typography>
              <Typography
                sx={{
                  py: 1,
                  minWidth: 0,
                }}
              >
                {stock.location}
              </Typography>
              <Typography color="text.secondary" sx={{ py: 1 }}>
                Website
              </Typography>
              <Box
                sx={{
                  py: 1,
                  minWidth: 0,
                }}
              >
                <Link
                  href={stock.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    maxWidth: "100%",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stock.websiteUrl}
                  </Typography>
                  <OpenInNewRoundedIcon
                    sx={{
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default StockDetails;
