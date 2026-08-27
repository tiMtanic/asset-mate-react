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
  getIndexEodTicks,
  getIndexesByTickerSymbol,
} from "../services/assetMateApi";
import { Link, Skeleton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ErrorCard from "../components/ErrorMessage";

function DashboardPage() {
  const [indexEodTicks, setIndexEodTicks] = useState([]);
  const [isIndexChartLoading, setIsIndexChartLoading] = useState(true);
  const [indexLoadErrorMessage, setIndexLoadErrorMessage] = useState("");

  useEffect(() => {
    loadIndexEodTicks();
  }, []);

  const loadIndexEodTicks = async () => {
    try {
      const getIndexesResult = await getIndexesByTickerSymbol("^SPX");
      const result = await getIndexEodTicks(getIndexesResult[0].id, 250);
      setIndexEodTicks(result.data);
      setIsIndexChartLoading(false);
    } catch (error) {
      setIndexLoadErrorMessage("Failed to load Index data!");
      console.log(error);
    }
  };

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
              </Box>
              {isIndexChartLoading ? (
                indexLoadErrorMessage ? (
                  <ErrorCard message={indexLoadErrorMessage} />
                ) : (
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
                )
              ) : (
                <Chart data={indexEodTicks} />
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
