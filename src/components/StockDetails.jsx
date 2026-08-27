import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addWatchlistEntry,
  deleteWatchlistEntry,
  getEodTicks,
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

function StockDetails() {
  const [stock, setStock] = useState(null);
  const [watchlistId, setWatchlistId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eodTicks, setEodTicks] = useState([]);
  const { stockId } = useParams();
  const navigate = useNavigate();

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
      // TODO: add proper error handling
      console.log(error);
    }
  };

  const loadEodTicks = async () => {
    try {
      const result = await getEodTicks(stockId, 250);
      setEodTicks(result.data);
    } catch (error) {
      // TODO: add proper error handling
      console.log(error);
    }
  };

  const loadWatchlistData = async () => {
    try {
      const result = await getWatchlistEntry(stockId);
      setWatchlistId(result[0]?.id ?? null);
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
        <Box>
          <Skeleton variant="text" width="35%" height={32} sx={{ mb: 2 }} />
          <Skeleton
            variant="rounded"
            width="100%"
            sx={{
              height: "auto",
              aspectRatio: "1 / 0.65",
              maxHeight: 500,
              mb: 3,
            }}
          />
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
      ) : (
        <Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              mb: 3,
            }}
          >
            {stock.companyName}
          </Typography>
          {eodTicks.length > 0 && (
            <Box
              sx={{
                width: "100%",
                mb: 3,
              }}
            >
              <Chart data={eodTicks} />
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
