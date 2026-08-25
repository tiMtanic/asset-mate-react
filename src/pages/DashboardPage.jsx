import React from "react";
import Chart from "../components/Chart";
import Watchlist from "../components/Watchlist";
import StocksList from "../components/StocksList";

function DashboardPage() {
  const data = [
{
      "stockId": "JSacz6rw4Hc",
      "date": 1782394200,
      "open": 287.3999938964844,
      "high": 288.79998779296875,
      "low": 273.75,
      "close": 275.1499938964844,
      "volume": 107013700,
      "id": "Nzjy4PCxOew"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1782307800,
      "open": 295.3599853515625,
      "high": 299.70001220703125,
      "low": 292.94000244140625,
      "close": 293.0799865722656,
      "volume": 53081900,
      "id": "8caOIbFtfVA"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1782480600,
      "open": 275,
      "high": 285.95001220703125,
      "low": 274.2099914550781,
      "close": 283.7799987792969,
      "volume": 261775500,
      "id": "U9j1sgYX654"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1782739800,
      "open": 286.7300109863281,
      "high": 288.3699951171875,
      "low": 279.8500061035156,
      "close": 281.739990234375,
      "volume": 66427000,
      "id": "puTtSZkATLM"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1782826200,
      "open": 281.1700134277344,
      "high": 289.94000244140625,
      "low": 280.70001220703125,
      "close": 289.3599853515625,
      "volume": 65100200,
      "id": "96PD39tn-4I"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1782912600,
      "open": 293.44000244140625,
      "high": 296.5899963378906,
      "low": 289.20001220703125,
      "close": 294.3800048828125,
      "volume": 50164200,
      "id": "n7NUCdioXfk"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1782999000,
      "open": 294.1199951171875,
      "high": 309.4200134277344,
      "low": 293.67999267578125,
      "close": 308.6300048828125,
      "volume": 75352800,
      "id": "K9zswywl25s"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1783344600,
      "open": 307.3599853515625,
      "high": 314.20001220703125,
      "low": 307,
      "close": 312.6600036621094,
      "volume": 53590000,
      "id": "Z7_0LSJOxYg"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1783431000,
      "open": 315.2900085449219,
      "high": 315.4800109863281,
      "low": 310.1499938964844,
      "close": 310.6600036621094,
      "volume": 42490000,
      "id": "oi1GFyVND5M"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1783517400,
      "open": 311.9100036621094,
      "high": 314.82000732421875,
      "low": 307.04998779296875,
      "close": 313.3900146484375,
      "volume": 41323500,
      "id": "FWu-v-WDowo"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1783603800,
      "open": 310.510009765625,
      "high": 316.5299987792969,
      "low": 308.1600036621094,
      "close": 316.2200012207031,
      "volume": 48124500,
      "id": "zpQOxvvM4Co"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1783690200,
      "open": 314.7200012207031,
      "high": 316.9100036621094,
      "low": 312.1700134277344,
      "close": 315.32000732421875,
      "volume": 34132300,
      "id": "WYFpx_KINRU"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1783949400,
      "open": 317.0199890136719,
      "high": 323.45001220703125,
      "low": 315.7799987792969,
      "close": 317.30999755859375,
      "volume": 43257800,
      "id": "zCQenEFG-JI"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1784122200,
      "open": 317.6199951171875,
      "high": 328.7300109863281,
      "low": 317.32000732421875,
      "close": 327.5,
      "volume": 60957600,
      "id": "b2AW1V-rniU"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1784035800,
      "open": 313.760009765625,
      "high": 316.19000244140625,
      "low": 311.9100036621094,
      "close": 314.8599853515625,
      "volume": 36336800,
      "id": "qfLysrPh2uw"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1784295000,
      "open": 331.9800109863281,
      "high": 334.989990234375,
      "low": 329,
      "close": 333.739990234375,
      "volume": 63407100,
      "id": "r0I9__xNHPQ"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1784208600,
      "open": 328.010009765625,
      "high": 334.67999267578125,
      "low": 326.7900085449219,
      "close": 333.260009765625,
      "volume": 62970600,
      "id": "fjT9hFZCP90"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1784554200,
      "open": 333.510009765625,
      "high": 333.7099914550781,
      "low": 323.67999267578125,
      "close": 326.5899963378906,
      "volume": 53468000,
      "id": "g5ac4WsNX5o"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1784640600,
      "open": 323.1300048828125,
      "high": 329.6000061035156,
      "low": 322.2200012207031,
      "close": 327.739990234375,
      "volume": 41338900,
      "id": "C2z4-y8AmfI"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1784727000,
      "open": 327.8699951171875,
      "high": 329,
      "low": 323.3399963378906,
      "close": 325.8900146484375,
      "volume": 38755900,
      "id": "1-x0xkNEh9o"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1784813400,
      "open": 321.7300109863281,
      "high": 323.29998779296875,
      "low": 319.3500061035156,
      "close": 321.6600036621094,
      "volume": 40840800,
      "id": "7ddaIygKroM"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1784899800,
      "open": 321.7900085449219,
      "high": 334.3699951171875,
      "low": 321.6199951171875,
      "close": 333.0199890136719,
      "volume": 47489400,
      "id": "kTYp77z9rY8"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1785159000,
      "open": 334.5400085449219,
      "high": 339.57000732421875,
      "low": 334.0199890136719,
      "close": 336.9100036621094,
      "volume": 49604300,
      "id": "ncTMU-_SCLU"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1785245400,
      "open": 340.0299987792969,
      "high": 342.8900146484375,
      "low": 335.6000061035156,
      "close": 340.0799865722656,
      "volume": 51859000,
      "id": "ONmNIpDGK8Q"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1785331800,
      "open": 339.7300109863281,
      "high": 344.57000732421875,
      "low": 337.3500061035156,
      "close": 338.19000244140625,
      "volume": 56090800,
      "id": "8IDdAWuNlrE"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1785418200,
      "open": 333.1000061035156,
      "high": 334.75,
      "low": 329.5899963378906,
      "close": 333.42999267578125,
      "volume": 74817800,
      "id": "AVv-1isuA58"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1785504600,
      "open": 304.80999755859375,
      "high": 310.69000244140625,
      "low": 300,
      "close": 308.9100036621094,
      "volume": 132489100,
      "id": "w2pJniDTtxY"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1785763800,
      "open": 309.5799865722656,
      "high": 311.79998779296875,
      "low": 302.55999755859375,
      "close": 303.4200134277344,
      "volume": 75052000,
      "id": "Qt7ZeJOUMzs"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1785850200,
      "open": 302.7300109863281,
      "high": 310.4200134277344,
      "low": 301.32000732421875,
      "close": 309.3800048828125,
      "volume": 68001000,
      "id": "en_Uo08FEkg"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1785936600,
      "open": 309.3599853515625,
      "high": 311.7099914550781,
      "low": 305.6700134277344,
      "close": 311,
      "volume": 49438800,
      "id": "L0puJr6BgfM"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1786023000,
      "open": 314.3399963378906,
      "high": 316.2900085449219,
      "low": 309.2300109863281,
      "close": 312.4100036621094,
      "volume": 46139900,
      "id": "aNyOqx8-iUU"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1786368600,
      "open": 306.8299865722656,
      "high": 308.260009765625,
      "low": 304.6099853515625,
      "close": 308.260009765625,
      "volume": 44812500,
      "id": "bo9xj3C-dl8"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1786109400,
      "open": 311.45001220703125,
      "high": 314.80999755859375,
      "low": 310.739990234375,
      "close": 313.3299865722656,
      "volume": 34437200,
      "id": "UmwhibecEKk"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1786455000,
      "open": 307.75,
      "high": 309.9700012207031,
      "low": 302.7900085449219,
      "close": 304.9100036621094,
      "volume": 37476700,
      "id": "ZaKenc9MWQM"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1786541400,
      "open": 305.1000061035156,
      "high": 305.6600036621094,
      "low": 300.57000732421875,
      "close": 302.25,
      "volume": 41657800,
      "id": "jHT0CBwHioo"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1786627800,
      "open": 304.2099914550781,
      "high": 306,
      "low": 302.04998779296875,
      "close": 305.260009765625,
      "volume": 40349300,
      "id": "Suy01rST3uk"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1786714200,
      "open": 306,
      "high": 307.489990234375,
      "low": 304.29998779296875,
      "close": 305.92999267578125,
      "volume": 28229400,
      "id": "2IMVv-ZWlnM"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1787059800,
      "open": 307.5799865722656,
      "high": 311.489990234375,
      "low": 305.739990234375,
      "close": 310.0299987792969,
      "volume": 53424500,
      "id": "Gcd72asJquI"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1786973400,
      "open": 306.2099914550781,
      "high": 307.6600036621094,
      "low": 302.94000244140625,
      "close": 305.5899963378906,
      "volume": 38169300,
      "id": "vhpb27mQ15Y"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1787232600,
      "open": 317.4599914550781,
      "high": 320.2799987792969,
      "low": 310.6499938964844,
      "close": 311.29998779296875,
      "volume": 40959200,
      "id": "a8cH7tEOC-o"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1787146200,
      "open": 310.1400146484375,
      "high": 319.2799987792969,
      "low": 309.6000061035156,
      "close": 316.8299865722656,
      "volume": 50505600,
      "id": "VhduWDjfSGA"
    },
    {
      "stockId": "JSacz6rw4Hc",
      "date": 1787319000,
      "open": 312.04998779296875,
      "high": 312.3800048828125,
      "low": 307.010009765625,
      "close": 309.3500061035156,
      "volume": 46768100,
      "id": "5ikuRl7J73Q"
    }
  ];

  return (
    <>
      <div className="stock-chart-container">
        <h3>S&P 500</h3>
        <Chart data={data} />
      </div>
      <div className="filtered-stocks-list-container">
        <h4>Top Gainers</h4>
        <StocksList displayMode="gainers" limit={3} />
      </div>
      <div className="filtered-stocks-list-container">
        <h4>Top Losers</h4>
        <StocksList displayMode="losers" limit={3} />
      </div>
      <div className="filtered-stocks-list-container">
        <h4>Watchlist</h4>
        <Watchlist limit={10} disableDeleteButton={true} />
      </div>
      
    </>
  );
}

export default DashboardPage;
