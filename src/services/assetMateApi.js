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

export async function getEodTicks(stockId, daysInPast) {
    const response = await axios.get(`${BASE_URL}/eodTicks?stockId=${stockId}${daysInPast ? "&_sort=-date&_page=1&_per_page=" + daysInPast : ""}`);
    console.log(response.data);
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