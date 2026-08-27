import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Link } from "react-router-dom";
import { findStocks } from "../services/assetMateApi";
import ErrorMessage from "./ErrorMessage";

function SearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [stocksList, setStocksList] = useState([]);
  const timerIdRef = useRef(null);

  useEffect(() => {
    loadStockList(searchValue);
  }, [searchValue]);

  useEffect(() => {
    return () => {
      clearTimeout(timerIdRef.current);
    };
  }, []);

  const loadStockList = (searchValue) => {
    clearTimeout(timerIdRef.current);
    setIsSearching(true);

    if (!searchValue.trim()) {
      setStocksList([]);
      setErrorMessage("");
      setIsSearching(false);
      return;
    }

    timerIdRef.current = setTimeout(async () => {
      try {
        setErrorMessage("");
        const result = await findStocks(searchValue);
        setStocksList(result);
      } catch (error) {
        console.log(error);
        setStocksList([]);
        setErrorMessage("Error searching stocks!");
      } finally {
        setIsSearching(false);
      }
    }, 1000);
  };

  const handleClose = () => {
    clearTimeout(timerIdRef.current);
    setIsOpen(false);
    setSearchValue("");
    setStocksList([]);
    setErrorMessage("");
    setIsSearching(false);
  };

  return (
    <>
      <IconButton
        aria-label="Open search"
        color="inherit"
        onClick={() => setIsOpen(true)}
      >
        <SearchRoundedIcon />
      </IconButton>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              position: "absolute",
              top: {
                xs: 16,
                sm: 48,
              },
              m: 0,
              width: {
                xs: "calc(100% - 32px)",
                sm: "100%",
              },
              borderRadius: 3,
            },
          },
        }}
      >
        <DialogContent sx={{ p: 2 }}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Search stocks..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="Close search"
                      onClick={handleClose}
                    >
                      <CloseRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box sx={{ mt: 2 }}>
            {isSearching ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 4,
                }}
              >
                <CircularProgress size={32} />
              </Box>
            ) : errorMessage ? (
              <ErrorMessage message={errorMessage} />
            ) : stocksList.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {stocksList.map((stock) => (
                  <Paper
                    key={stock.id}
                    component={Link}
                    to={`/stocks/${stock.id}`}
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.5,
                      color: "text.primary",
                      textDecoration: "none",
                      transition: "background-color 0.2s, border-color 0.2s",
                      "&:hover": {
                        bgcolor: "action.hover",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        bgcolor: "#FFFFFF",
                        border: 1,
                        borderColor: "divider",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={stock.logoUrl}
                        alt={`${stock.companyName} logo`}
                        sx={{
                          width: "80%",
                          height: "80%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        minWidth: 0,
                        flexGrow: 1,
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight={600} noWrap>
                        {stock.companyName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {stock.tickerSymbol}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : searchValue.trim() ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  py: 3,
                }}
              >
                No stocks found
              </Typography>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  py: 3,
                }}
              >
                Start typing to search for stocks
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchBox;
