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
                  width: "100%",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexGrow: 1,
                    minWidth: 0,
                    p: 2,
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
                </Box>
                {!disableDeleteButton && (
                  <Skeleton
                    variant="circular"
                    width={28}
                    height={28}
                    sx={{
                      mr: 2,
                      flexShrink: 0,
                    }}
                  />
                )}
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
          {watchlistEntries.map((watchlistEntry) => (
            <Paper
              key={watchlistEntry.id}
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
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
                    src={watchlistEntry.stock.logoUrl}
                    alt={`${watchlistEntry.stock.companyName} logo`}
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
                    {watchlistEntry.stock.companyName}
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
                    <RecentPriceData stockId={watchlistEntry.stockId} />
                  </Box>
                </Box>
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
