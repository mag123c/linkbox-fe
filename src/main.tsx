import { CssBaseline, GlobalStyles } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        margin: 0,
        padding: 0,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#121212",
        color: "#ffffff",
        fontFamily: "'Noto Sans KR', sans-serif",
      },
      "#root": {
        width: "100%",
        maxWidth: "500px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#121212",
      },
      "*": {
        boxSizing: "border-box",
      },
    }}
  />
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {globalStyles}
    <CssBaseline />
    <App />
  </React.StrictMode>
);
