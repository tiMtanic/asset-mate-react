import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const logResponses = false;

export async function getStocks() {
    const response = await axios.get(`${BASE_URL}/stocks`);
    logResponses && console.log("getStocks", response.data);
    return response.data;
}

export async function findStocks(searchString) {
    const response = await axios.get(`${BASE_URL}/stocks?_where={"or":[{"companyName":{"contains":"${searchString}"}},{"tickerSymbol":{"contains":"${searchString}"}}]}`);
    logResponses && console.log("findStocks", response.data);
    return response.data;
}

export async function getStock(stockId) {
    const response = await axios.get(`${BASE_URL}/stocks/${stockId}`);
    logResponses && console.log("getStock", response.data);
    return response.data;
}

export async function addStock(newStock) {
    const response = await axios.post(`${BASE_URL}/stocks`, newStock);
    logResponses && console.log("addStock", response.data);
    return response.data;
}

export async function updateStock(stockId, updatedStock) {
    const response = await axios.put(`${BASE_URL}/stocks/${stockId}`, updatedStock);
    logResponses && console.log("updateStock", response.data);
    return response.data;
}

export async function deleteStock(stockId) {
    const response = await axios.delete(`${BASE_URL}/stocks/${stockId}?_dependent=watchlist&_dependent=eodTicks`);
    logResponses && console.log("deleteStock", response.data);
    return response.data;
}

export async function getEodTicks(stockId, ticksInPast) {
    const response = await axios.get(`${BASE_URL}/eodTicks?stockId=${stockId}${ticksInPast ? "&_sort=-date&_page=1&_per_page=" + ticksInPast : ""}`);
    logResponses && console.log("getEodTicks", response.data);
    return response.data;
}

export async function getEodTicksByStartDate(stockId, startDate) {
    const response = await axios.get(`${BASE_URL}/eodTicks?stockId=${stockId}&date:gt=${startDate}&_sort=-date`);
    logResponses && console.log("getEodTicksByStartDate", response.data);
    return response.data;
}

export async function addEodTicks(eodTicks) {
    const response = await axios.post(`${BASE_URL}/eodTicks`, eodTicks);
    logResponses && console.log("addEodTicks", response.data);
    return response.data;
}

export async function getWatchlist(limit) {
    const response = await axios.get(`${BASE_URL}/watchlist?_embed=stock${limit ? `&_page=1&_per_page=${limit}` : ""}`);
    logResponses && console.log("getWatchlist", response.data);
    return response.data;
}

export async function getWatchlistEntry(stockId) {
    const response = await axios.get(`${BASE_URL}/watchlist?stockId=${stockId}`);
    logResponses && console.log("getWatchlistEntry", response.data);
    return response.data;
}

export async function addWatchlistEntry(stockId) {
    const response = await axios.post(`${BASE_URL}/watchlist`, {
        stockId: stockId
    });
    logResponses && console.log("addWatchlistEntry", response.data);
    return response.data;
}

export async function deleteWatchlistEntry(watchlistId) {
    const response = await axios.delete(`${BASE_URL}/watchlist/${watchlistId}`);
    logResponses && console.log("deleteWatchlistEntry", response.data);
    return response.data;
}

export async function getIndexesByTickerSymbol(tickerSymbol) {
    const response = await axios.get(`${BASE_URL}/indexes?tickerSymbol=${tickerSymbol}`);
    logResponses && console.log("getIndexesByTickerSymbol", response.data);
    return response.data;
}

export async function getIndexEodTicks(indexId, ticksInPast) {
    const response = await axios.get(`${BASE_URL}/eodTicks?indexId=${indexId}${ticksInPast ? "&_sort=-date&_page=1&_per_page=" + ticksInPast : ""}`);
    logResponses && console.log("getIndexEodTicks", response.data);
    return response.data;
}

export async function getIndexEodTicksByStartDate(indexId, startDate) {
    const response = await axios.get(`${BASE_URL}/eodTicks?indexId=${indexId}&date:gt=${startDate}&&_sort=-date`);
    logResponses && console.log("getIndexEodTicksByStartDate", response.data);
    return response.data;
}