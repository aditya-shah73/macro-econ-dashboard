import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

export default function Connected() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  useEffect(() => {
    const onlineListener = window.addEventListener("online", () =>
      setIsOnline(true)
    );
    const offlineListener = window.addEventListener("offline", () =>
      setIsOnline(false)
    );

    return () => {
      window.removeEventListener("online", onlineListener);
      window.removeEventListener("offline", offlineListener);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color={isOnline ? "primary" : "secondary"}>
        &#11044; {isOnline ? " Connected" : " Local"}
      </Button>
    </ThemeProvider>
  );
}
