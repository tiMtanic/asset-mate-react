import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chart from "../components/Chart";
import Watchlist from "../components/Watchlist";
import StocksList from "../components/StocksList";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import PageHeader from "../components/PageHeader";
import PageContent from "../components/PageContent";
import {
  getIndexEodTicksByStartDate,
  getIndexesByTickerSymbol,
} from "../services/assetMateApi";
import { CircularProgress, Link, Skeleton } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Link as RouterLink } from "react-router-dom";
import ErrorCard from "../components/ErrorMessage";

function DashboardPage() {
  const [indexId, setIndexId] = useState(null);
  const [indexEodTicks, setIndexEodTicks] = useState([]);
  const [isIndexChartLoading, setIsIndexChartLoading] = useState(true);
  const [indexLoadErrorMessage, setIndexLoadErrorMessage] = useState("");
  const [chartTimeframe, setChartTimeframe] = useState("1Y");

  useEffect(() => {
    loadIndexEodTicks();
  }, []);

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

  const loadIndexEodTicks = async () => {
    try {
      const getIndexesResult = await getIndexesByTickerSymbol("^SPX");
      const id = getIndexesResult[0].id;

      setIndexId(id);

      const result = await getIndexEodTicksByStartDate(
        id,
        getStartDateForTimeframe(chartTimeframe),
      );

      setIndexEodTicks(result);
    } catch (error) {
      setIndexLoadErrorMessage("Failed to load Index data!");
      console.log(error);
    } finally {
      setIsIndexChartLoading(false);
    }
  };

  const handleChartTimeframeChange = async (event, newTimeframe) => {
    if (newTimeframe === null) {
      return;
    }

    setChartTimeframe(newTimeframe);
    setIsIndexChartLoading(true);
    setIndexLoadErrorMessage("");

    try {
      const result = await getIndexEodTicksByStartDate(
        indexId,
        getStartDateForTimeframe(newTimeframe),
      );

      setIndexEodTicks(result);
    } catch (error) {
      setIndexLoadErrorMessage("Failed to load Index data!");
      console.log(error);
    } finally {
      setIsIndexChartLoading(false);
    }
  };

  const indexPriceChange =
    indexEodTicks.length > 1
      ? ((indexEodTicks[0].close -
          indexEodTicks[indexEodTicks.length - 1].close) /
          indexEodTicks[indexEodTicks.length - 1].close) *
        100
      : null;

  return (
    <Box>
      <PageHeader
        icon={DashboardRoundedIcon}
        title={"Dashboard"}
        caption={"An overview of the market and your watchlist"}
      />
      <PageContent displayWithoutCard={true}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <ShowChartRoundedIcon
                  sx={{
                    color: "primary.main",
                    fontSize: 22,
                  }}
                />
                <Typography variant="h6" component="h2" fontWeight={600}>
                  S&P 500
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {indexEodTicks.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    {indexPriceChange !== null && (
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{
                          color:
                            indexPriceChange > 0
                              ? "success.main"
                              : indexPriceChange < 0
                                ? "error.main"
                                : "text.secondary",
                        }}
                      >
                        {indexPriceChange > 0 ? "+" : ""}
                        {indexPriceChange.toFixed(2)}%
                      </Typography>
                    )}
                    <Typography variant="h6" fontWeight={600}>
                      {indexEodTicks[0].close.toFixed(2)}
                    </Typography>
                  </Box>
                ) : (
                  isIndexChartLoading && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Skeleton variant="text" width={55} height={28} />
                      <Skeleton variant="text" width={90} height={32} />
                    </Box>
                  )
                )}
              </Box>

              {indexLoadErrorMessage && indexEodTicks.length === 0 ? (
                <ErrorCard message={indexLoadErrorMessage} />
              ) : indexEodTicks.length === 0 && isIndexChartLoading ? (
                <Box>
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
              ) : (
                <>
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
                    <Chart data={indexEodTicks} currencySymbol="" />
                    {isIndexChartLoading && (
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
                  {indexLoadErrorMessage && (
                    <Box sx={{ mt: 2 }}>
                      <ErrorCard message={indexLoadErrorMessage} />
                    </Box>
                  )}
                </>
              )}
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
              },
              gap: 3,
            }}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <TrendingUpRoundedIcon
                    sx={{
                      color: "success.main",
                      fontSize: 22,
                    }}
                  />
                  <Typography variant="h6" component="h2" fontWeight={600}>
                    Top Gainers
                  </Typography>
                </Box>
                <StocksList displayMode="gainers" limit={3} />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <TrendingDownRoundedIcon
                    sx={{
                      color: "error.main",
                      fontSize: 22,
                    }}
                  />
                  <Typography variant="h6" component="h2" fontWeight={600}>
                    Top Losers
                  </Typography>
                </Box>
                <StocksList displayMode="losers" limit={3} />
              </CardContent>
            </Card>
          </Box>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <StarBorderRoundedIcon
                  sx={{
                    color: "primary.main",
                    fontSize: 22,
                  }}
                />
                <Typography variant="h6" component="h2" fontWeight={600}>
                  Watchlist
                </Typography>
              </Box>
              <Watchlist limit={10} disableDeleteButton={true} />
              <Link
                component={RouterLink}
                to="/watchlist"
                underline="hover"
                sx={{
                  display: "block",
                  textAlign: "right",
                  mt: 2,
                  mr: 1,
                  fontWeight: 500,
                }}
              >
                View Full Watchlist
              </Link>
            </CardContent>
          </Card>
        </Box>
      </PageContent>
    </Box>
  );
}

export default DashboardPage;
