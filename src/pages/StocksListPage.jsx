import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import StocksList from "../components/StocksList";
import PageHeader from "../components/PageHeader";
import PageContent from "../components/PageContent";

function StocksListPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <PageHeader
        icon={ShowChartRoundedIcon}
        title={"Stocks"}
        caption={"View and manage stocks"}
      >
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => navigate("/stocks/add")}
          sx={{
            flexShrink: 0,
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          Add Stock
        </Button>
      </PageHeader>
      <PageContent>
        <StocksList />
      </PageContent>
    </Box>
  );
}

export default StocksListPage;
