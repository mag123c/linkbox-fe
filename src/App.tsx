import { CssBaseline, GlobalStyles } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import LoginPage from "./pages/LoginPage";

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

function App() {
  return (
    <>
      {globalStyles}
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route
            path="/categories/:categoryId"
            element={<CategoryDetailPage />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
