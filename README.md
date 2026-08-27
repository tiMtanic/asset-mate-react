# AssetMate

Asset Mate is a single-page application for displaying company information, including stock price data.

The application uses a mock backend, so stock prices may not always be up to date. The main focus of the project is building a responsive frontend with a mobile-first approach.

## Additional Information

### Data Model

```mermaid
erDiagram
    index ||--o{ eodTick : "contains"
    index {
      string id PK
      string tickerSymbol
      string indexName
    }
    stock ||--o{ eodTick : "contains"
    stock {
      string id PK
      string tickerSymbol
      string companyName
      string logoUrl
      number foundedYear
      number employeesCount
      string location
      string websiteUrl
      string description
      string lastPrice
      string lastPriceChange
    }
    eodTick {
      string id PK
      string stockId FK
      string indexId FK
      number date
      number open
      number high
      number low
      number close
      number volume
    }
    stock }o--o| watchlist : "may be included in"
    watchlist {
      string id PK
      string stockId FK
    }
```

### Tools Used

[Figma](https://www.figma.com/)\
[Visual Studio Code](https://code.visualstudio.com/)\
[Adobe Photoshop](https://www.adobe.com/products/photoshop.html)\
[ChatGPT 5.6-Sol](https://chatgpt.com/)

### Resources Used

[MDN Web Docs](https://developer.mozilla.org/en-US/)\
[W3Schools](https://www.w3schools.com/)\
[StackOverflow](https://stackoverflow.com/)\
[Material UI](https://mui.com/material-ui/)\
[Roboto Font](https://fonts.google.com/specimen/Roboto)\
[Vite](https://vite.dev/)\
[React](https://react.dev/)\
[React Router](https://reactrouter.com/)
