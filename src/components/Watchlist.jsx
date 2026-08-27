import { useEffect, useState } from "react";
import { deleteWatchlistEntry, getWatchlist } from "../services/assetMateApi";
import { Link } from "react-router-dom";
import RecentPriceData from "./RecentPriceData";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ErrorMessage from "./ErrorMessage";

function Watchlist({ limit, disableDeleteButton }) {
  const [watchlistEntries, setWatchlistEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getWatchlistData();
  }, []);

  const getWatchlistData = async () => {
    try {
      setIsLoading(true);
      const watchlistResult = await getWatchlist();
      setWatchlistEntries(
        limit ? watchlistResult.slice(0, limit) : watchlistResult,
      );
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Error loading watchlist!");
      console.log(error);
    }
  };

  const removeFromWatchlist = async (watchlistEntry) => {
    try {
      await deleteWatchlistEntry(watchlistEntry.id);
      setWatchlistEntries((entries) =>
        entries.filter((x) => x.id !== watchlistEntry.id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickRemoveFromWatchlist = (e, watchlistEntry) => {
    e.preventDefault();
    removeFromWatchlist(watchlistEntry);
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
              <Skeleton variant="text" width={55} height={28} />
              <Skeleton variant="rounded" width={48} height={28} />
              {!disableDeleteButton && (
                <Skeleton variant="circular" width={28} height={28} />
              )}
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
          {watchlistEntries.map((watchlistEntry) => (
            <Paper
              key={watchlistEntry.id}
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                boxSizing: "border-box",
                transition: "background-color 0.2s, border-color 0.2s",

                "&:hover": {
                  bgcolor: "action.hover",
                  borderColor: "primary.main",
                },
              }}
            >
              <Box
                component={Link}
                to={`/stocks/${watchlistEntry.stockId}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexGrow: 1,
                  minWidth: 0,
                  p: 2,
                  color: "text.primary",
                  textDecoration: "none",
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {watchlistEntry.stock.companyName}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <RecentPriceData stockId={watchlistEntry.stockId} />
              </Box>
              {!disableDeleteButton && (
                <IconButton
                  aria-label={`Remove ${watchlistEntry.stock.companyName} from watchlist`}
                  color="error"
                  onClick={(event) =>
                    handleClickRemoveFromWatchlist(event, watchlistEntry)
                  }
                  sx={{
                    mr: 1,
                    flexShrink: 0,
                  }}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              )}
            </Paper>
          ))}
        </Box>
      )}
    </>
  );
}

export default Watchlist;
