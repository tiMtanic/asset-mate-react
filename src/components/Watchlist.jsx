import { useEffect, useState } from "react";
import { deleteWatchlistEntry, getWatchlist } from "../services/assetMateApi";
import { Link } from "react-router-dom";
import RecentPriceData from "./RecentPriceData";

function Watchlist({ limit, disableDeleteButton }) {
  const [watchlistEntries, setWatchlistEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWatchlistData();
  }, []);

  const getWatchlistData = async () => {
    try {
      setIsLoading(true);
      const watchlistResult = await getWatchlist();
      setWatchlistEntries(limit ? watchlistResult.slice(0, limit) : watchlistResult);
      setIsLoading(false);
    } catch (error) {
      // TODO: add proper error handling
      console.log(error);
    }
  };

  const removeFromWatchlist = async (watchlistEntry) => {
    try {
      await deleteWatchlistEntry(watchlistEntry.id);
      setWatchlistEntries((entries) =>
        entries.filter((x) => x.id !== watchlistEntry.id)
      );
    } catch (error) {
      // TODO: proper error handling
      console.log(error);
    }
  };

  const handleClickRemoveFromWatchlist = (e, watchlistEntry) => {
    e.preventDefault();
    removeFromWatchlist(watchlistEntry);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div id="watchlist">
          {watchlistEntries.map((watchlistEntry) => <Link to={`/stocks/${watchlistEntry.stockId}`} key={watchlistEntry.id}>
            <div className="watchlist-entry">
              <p>{watchlistEntry.stock.companyName}</p>
              <div className="watchist-price-and-action">
                <RecentPriceData stockId={watchlistEntry.stockId} />
                {!disableDeleteButton &&
                <button onClick={(e) => handleClickRemoveFromWatchlist(e, watchlistEntry)}>X</button>}
              </div>
            </div>
          </Link>)}
        </div>
      )}
    </>
  );
}

export default Watchlist;
