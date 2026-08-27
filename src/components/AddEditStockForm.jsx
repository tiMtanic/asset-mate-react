import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addEodTicks,
  addStock,
  deleteStock,
  getEodTicks,
  getStock,
  updateStock,
} from "../services/assetMateApi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

function AddEditStockForm() {
  const { stockId } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState({
    tickerSymbol: "",
    companyName: "",
    logoUrl: "",
    foundedYear: 1900,
    employeesCount: 0,
    location: "",
    websiteUrl: "",
    description: "",
  });
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    stockId ? loadStock() : setIsLoading(false);
  }, [stockId]);

  const loadStock = async () => {
    try {
      setStock(await getStock(stockId));
      setIsLoading(false);
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData(e.target);
      const file = formData.get("stockDataJson");

      let savedStockId = stockId;
      let stockToSave = stock;

      if (!stockId) {
        const response = await addStock(stock);
        savedStockId = response.id;
      }

      if (file?.size > 0) {
        const contents = await file.text();
        const data = JSON.parse(contents);

        const lastEodTick = stockId ? await getEodTicks(stockId, 1) : null;

        const eodTicks = transformJsonData(
          savedStockId,
          lastEodTick?.data[0]?.date,
          data,
        );

        eodTicks.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (eodTicks.length > 0) {
          const today = eodTicks[0].close;
          const yesterday = eodTicks[1]?.close ?? lastEodTick?.data[0]?.close;

          const lastPriceChange =
            yesterday != null && yesterday !== 0
              ? ((today - yesterday) / yesterday) * 100
              : null;

          stockToSave = {
            ...stock,
            lastPrice: today,
            lastPriceChange,
          };

          setStock(stockToSave);
        }

        await Promise.all(eodTicks.map((tick) => addEodTicks(tick)));
      }

      await updateStock(savedStockId, stockToSave);

      navigate(`/stocks/${savedStockId}`);
    } catch (error) {
      // TODO: proper error handling
      console.log(error);
    }
  };

  const transformJsonData = (stockId, lastTimestamp, originalJson) => {
    const eodTicks = [];
    originalJson.chart.result[0].timestamp.forEach((timestamp, i) => {
      if (!lastTimestamp || timestamp > lastTimestamp) {
        eodTicks.push({
          stockId: stockId,
          date: timestamp,
          open: originalJson.chart.result[0].indicators.quote[0].open[i],
          high: originalJson.chart.result[0].indicators.quote[0].high[i],
          low: originalJson.chart.result[0].indicators.quote[0].low[i],
          close: originalJson.chart.result[0].indicators.quote[0].close[i],
          volume: originalJson.chart.result[0].indicators.quote[0].volume[i],
        });
      }
    });

    return eodTicks;
  };

  const handleClickDelete = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      await deleteStock(stockId);
      navigate(`/stocks`);
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
  };

  const handleInputChange = (e) =>
    setStock({ ...stock, [e.target.name]: e.target.value });

  return (
    <>
      {IsLoading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2.5,
          }}
        >
          {Array.from({ length: 7 }).map((_, index) => (
            <Box key={index}>
              <Skeleton variant="rounded" width="100%" height={56} />
            </Box>
          ))}
          <Box
            sx={{
              gridColumn: "1 / -1",
            }}
          >
            <Skeleton variant="rounded" width="100%" height={120} />
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
            }}
          >
            <Skeleton variant="text" width={130} height={24} sx={{ mb: 0.5 }} />
            <Skeleton variant="rounded" width={180} height={44} />
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 1,
            }}
          >
            {stockId && <Skeleton variant="rounded" width={140} height={44} />}
            <Skeleton variant="rounded" width={140} height={44} />
          </Box>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2.5,
          }}
        >
          <TextField
            name="companyName"
            id="company-name"
            label="Company Name"
            type="text"
            value={stock.companyName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="logoUrl"
            id="logo-url"
            label="Logo URL"
            type="url"
            value={stock.logoUrl}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="tickerSymbol"
            id="ticker-symbol"
            label="Ticker Symbol"
            type="text"
            value={stock.tickerSymbol}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="foundedYear"
            id="founded-year"
            label="Founded (YYYY)"
            type="number"
            value={stock.foundedYear}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="employeesCount"
            id="employees-count"
            label="Employees"
            type="number"
            value={stock.employeesCount}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="location"
            id="location"
            label="Location"
            type="text"
            value={stock.location}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="websiteUrl"
            id="website-url"
            label="Website URL"
            type="url"
            value={stock.websiteUrl}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="description"
            id="description"
            label="Description"
            value={stock.description}
            onChange={handleInputChange}
            multiline
            minRows={4}
            fullWidth
            sx={{
              gridColumn: "1 / -1",
            }}
          />
          <Box
            sx={{
              gridColumn: "1 / -1",
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Stock Data (JSON)
            </Typography>
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadFileRoundedIcon />}
              sx={{
                minHeight: 44,
                height: 44,
                boxSizing: "border-box",
                py: 0,
              }}
            >
              Choose JSON File
              <input
                hidden
                name="stockDataJson"
                id="stock-data-json"
                type="file"
                accept="application/json"
              />
            </Button>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: {
                xs: "column-reverse",
                sm: "row",
              },
              gap: 1.5,
              mt: 1,
            }}
          >
            {stockId && (
              <Button
                type="button"
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineRoundedIcon />}
                onClick={handleClickDelete}
                sx={{
                  minHeight: 46,
                  height: 46,
                  boxSizing: "border-box",
                  py: 0,
                  px: 2,
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                }}
              >
                Delete Stock
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveRoundedIcon />}
              sx={{
                minHeight: 44,
                height: 44,
                boxSizing: "border-box",
                py: 0,
                px: 2,
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              {stockId ? "Save Changes" : "Add Stock"}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default AddEditStockForm;
