import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getStocks() {
    const response = await axios.get(`${BASE_URL}/stocks`);
    console.log("getStocks", response.data);
    return response.data;
}

export async function getEodTicks(stockId, daysInPast) {
    const response = await axios.get(`${BASE_URL}/eodTicks?stockId=${stockId}${daysInPast ? "&_sort=-date&_page=1&_per_page=" + daysInPast : ""}`);
    console.log(response.data);
    return response.data;
}