import React from "react";
import Box from "@mui/material/Box";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import StockDetails from "../components/StockDetails";
import PageHeader from "../components/PageHeader";
import PageContent from "../components/PageContent";

function StockPage() {
  return (
    <Box>
      <PageHeader
        icon={ShowChartRoundedIcon}
        title={"Stock Details"}
        caption={"View company information and recent stock performance"}
      />
      <PageContent>
        <StockDetails />
      </PageContent>
    </Box>
  );
}

export default StockPage;
