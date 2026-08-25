import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addEodTicks, addStock, deleteStock, getEodTicks, getStock, updateStock } from "../services/assetMateApi";

function AddEditStockForm() {
  const { stockId } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState({
    tickerSymbol: "",
    companyName: "",
    logoUrl: "",
    foundedYear: 0,
    employeesCount: 0,
    location: "",
    websiteUrl: "",
    description: ""
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

  // const handleSubmit = async (e) => {
  //   try {
  //     setIsLoading(true);
  //     e.preventDefault();
  
  //     const response = stockId ? await updateStock(stockId, stock) : await addStock(stock);
  //     const formJson = Object.fromEntries(new FormData(e.target).entries());
  //     const file = formJson["stockDataJson"];

  //     if (file.name !== "") {
  //       const contents = await file.text();
  //       const data = JSON.parse(contents);
  
  //       // Get last timestamp
  //       const lastEodTick = stockId ? await getEodTicks(stockId, 1) : null;
  //       const eodTicks = transformJsonData(response.id, lastEodTick?.data[0]?.date, data);
  //       eodTicks.sort((a, b) => a.date - b.date);

  //       if (eodTicks[0]) {
  //         const today = eodTicks[0].close;
  //         const yesterday = eodTicks[1] ? eodTicks[1].close : lastEodTick?.data[0]?.close;

  //         setStock({
  //           ...stock,
  //           lastPrice: today,
  //           lastPriceChange: (((today - yesterday) / yesterday) * 100)
  //         });
  //       }

  //       await updateStock(stockId, stock)

  //       await Promise.all(
  //         eodTicks.map((item) => addEodTicks(item))
  //       );

  //     }

  //     navigate(`/stocks/${response.id}`);
  //   } catch (error) {
  //     // TODO: error handling
  //     console.log(error);
  //   }
  // }

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

        const lastEodTick = stockId
          ? await getEodTicks(stockId, 1)
          : null;

        const eodTicks = transformJsonData(
          savedStockId,
          lastEodTick?.data[0]?.date,
          data
        );

        eodTicks.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        if (eodTicks.length > 0) {
          const today = eodTicks[0].close;
          const yesterday =
            eodTicks[1]?.close ??
            lastEodTick?.data[0]?.close;

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

        await Promise.all(
          eodTicks.map((tick) => addEodTicks(tick))
        );
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
        eodTicks.push(
          {
            "stockId": stockId,
            "date": timestamp,
            "open": originalJson.chart.result[0].indicators.quote[0].open[i],
            "high": originalJson.chart.result[0].indicators.quote[0].high[i],
            "low": originalJson.chart.result[0].indicators.quote[0].low[i],
            "close": originalJson.chart.result[0].indicators.quote[0].close[i],
            "volume": originalJson.chart.result[0].indicators.quote[0].volume[i]
          });
      }
    });

    return eodTicks;
    // chart.result[0].
    // timestamp
    //
    // indicators.quote[0].
    // open high low close volume (Array)
    // adjclose[0].adjclose (Array)

  }

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

  const handleInputChange = (e) => setStock({...stock, [e.target.name]: e.target.value});

  return (
    <>
      {IsLoading ? <p>Loading...</p> :
      <div id="stock-add-edit-container">
        <form onSubmit={handleSubmit}>
          <div className="form-input-container">
            <label htmlFor="company-name">Company Name</label>
            <input name="companyName" id="company-name" type="text" value={stock.companyName} onChange={handleInputChange} />
          </div>
          <div className="form-input-container">
            <label htmlFor="logo-url">Logo URL</label>
            <input name="logoUrl" id="logo-url" type="url" value={stock.logoUrl} onChange={handleInputChange} />
          </div>
          <div className="form-input-container">
            <label htmlFor="ticker-symbol">Ticker Symbol</label>
            <input name="tickerSymbol" id="ticker-symbol" type="text" value={stock.tickerSymbol} onChange={handleInputChange} />
          </div>
          <div className="form-input-container">
            <label htmlFor="founded-year">Founded (YYYY)</label>
            <input name="foundedYear" id="founded-year" type="number" value={stock.foundedYear} onChange={handleInputChange} />
          </div>
          <div className="form-input-container">
            <label htmlFor="employees-count">Employees</label>
            <input name="employeesCount" id="employees-count" type="number" value={stock.employeesCount} onChange={handleInputChange} />
          </div>
          <div className="form-input-container">
            <label htmlFor="location">Location</label>
            <input name="location" id="location" type="text" value={stock.location} onChange={handleInputChange} />
          </div>
          <div className="form-input-container">
            <label htmlFor="website-url">Website URL</label>
            <input name="websiteUrl" id="website-url" type="url" value={stock.websiteUrl} onChange={handleInputChange} />
          </div>
          <div className="form-input-container">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" type="text" value={stock.description} onChange={handleInputChange} />
          </div>
          <div className="form-input-container">
            <label htmlFor="stock-data-json">Stock Data (JSON)</label>
            <input name="stockDataJson" id="stock-data-json" type="file" accept="application/json" />
          </div>
          <div id="form-actions">
            {stockId && <button onClick={handleClickDelete}>Delete</button>}
            <button type="submit">{stockId ? "Edit" : "Add"} Stock</button>
          </div>
        </form>
      </div>}
    </>
  );
}

export default AddEditStockForm;
