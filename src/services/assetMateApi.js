import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getStocks() {
    const response = await axios.get(`${BASE_URL}/stocks`);
    console.log("getStocks", response.data);
    return response.data;
}

export async function getStock(stockId) {
    const response = await axios.get(`${BASE_URL}/stocks/${stockId}`);
    console.log("getStock", response.data);
    return response.data;
}

export async function addStock(newStock) {
    const response = await axios.post(`${BASE_URL}/stocks`, newStock);
    console.log("addStock", response.data);
    return response.data;
}

export async function updateStock(stockId, updatedStock) {
    const response = await axios.put(`${BASE_URL}/stocks/${stockId}`, updatedStock);
    console.log("updateStock", response.data);
    return response.data;
}

export async function deleteStock(stockId) {
    const response = await axios.delete(`${BASE_URL}/stocks/${stockId}?_dependent=watchlist&_dependent=eodTicks`);
    console.log("deleteStock", response.data);
    return response.data;
}

export async function getEodTicks(stockId, ticksInPast) {
    const response = await axios.get(`${BASE_URL}/eodTicks?stockId=${stockId}${ticksInPast ? "&_sort=-date&_page=1&_per_page=" + ticksInPast : ""}`);
    console.log("getEodTicks", response.data);
    return response.data;
}

export async function addEodTicks(eodTicks) {
    const response = await axios.post(`${BASE_URL}/eodTicks`, eodTicks);
    console.log("addEodTicks", response.data);
    return response.data;
}

export async function getWatchlist(limit) {
    const response = await axios.get(`${BASE_URL}/watchlist?_embed=stock${limit ? `&_page=1&_per_page=${limit}` : ""}`);
    console.log("getWatchlist", response.data);
    return response.data;
}

export async function getWatchlistEntry(stockId) {
    const response = await axios.get(`${BASE_URL}/watchlist?stockId=${stockId}`);
    console.log("getWatchlistEntry", response.data);
    return response.data;
}

export async function addWatchlistEntry(stockId) {
    const response = await axios.post(`${BASE_URL}/watchlist`, {
        stockId: stockId
    });
    console.log("addWatchlistEntry", response.data);
    return response.data;
}

export async function deleteWatchlistEntry(watchlistId) {
    const response = await axios.delete(`${BASE_URL}/watchlist/${watchlistId}`);
    console.log("deleteWatchlistEntry", response.data);
    return response.data;
}

export async function getIndexEodTicks(indexId, ticksInPast) {
    const response = await axios.get(`${BASE_URL}/eodTicks?indexId=${indexId}${ticksInPast ? "&_sort=-date&_page=1&_per_page=" + ticksInPast : ""}`);
    console.log("getIndexEodTicks", response.data);
    return response.data;
}