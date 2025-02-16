import { CssBaseline, GlobalStyles } from "@mui/material";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppNavBar from "./components/AppBar";
import Home from "./pages/Home";

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
  const [categoryUpdated, setCategoryUpdated] = useState(false);

  // ✅ 카테고리 추가 후 업데이트 상태 변경
  const handleCategoryAdded = () => {
    setCategoryUpdated((prev) => !prev); // 상태 변경을 통해 강제 리렌더링
  };

  return (
    <>
      {globalStyles}
      <CssBaseline />
      <Router>
        <AppNavBar onCategoryAdded={handleCategoryAdded} />{" "}
        {/* ✅ AppNavBar에 props 추가 */}
        <Routes>
          <Route
            path="/"
            element={<Home categoryUpdated={categoryUpdated} />}
          />{" "}
          {/* ✅ Home으로 전달 */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
