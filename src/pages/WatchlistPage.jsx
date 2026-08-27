import React from "react";
import Box from "@mui/material/Box";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import Watchlist from "../components/Watchlist";
import PageHeader from "../components/PageHeader";
import PageContent from "../components/PageContent";

function WatchlistPage() {
  return (
    <Box>
      <PageHeader
        icon={StarBorderRoundedIcon}
        title={"Watchlist"}
        caption={"Keep track of the stocks you watchlisted"}
      />
      <PageContent>
        <Watchlist />
      </PageContent>
    </Box>
  );
}

export default WatchlistPage;
