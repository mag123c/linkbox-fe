import { Box, Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API_BASE_URL } from "../services/axios-client";

export default function LoginPage() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleKakaoLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/login/kakao`;
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <Button
        variant="contained"
        onClick={handleKakaoLogin}
        sx={{
          padding: 0,
          minWidth: "auto",
          backgroundColor: "transparent",
          border: "none",
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        <Box
          component="img"
          src="/icon/kakao_login.png"
          alt="카카오 로그인 버튼"
        />
      </Button>
    </Box>
  );
}
