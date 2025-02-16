import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function CategoryBar({
  categories,
  setCategory,
  selectedCategory,
}: {
  categories: string[];
  setCategory: (category: string) => void;
  selectedCategory: string | null;
}) {
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // 스크롤 가능 여부 업데이트
  const updateScrollButtons = () => {
    if (categoryContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        categoryContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // 스크롤 및 리사이즈 감지
  useEffect(() => {
    const container = categoryContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
      updateScrollButtons();
    }
    return () => {
      if (container)
        container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (categoryContainerRef.current) {
      const moveAmount = categoryContainerRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? categoryContainerRef.current.scrollLeft - moveAmount
          : categoryContainerRef.current.scrollLeft + moveAmount;

      categoryContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        p: 1,
        bgcolor: "#1E1E1E",
        borderRadius: "8px",
        m: 2,
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      {canScrollLeft && (
        <IconButton
          onClick={() => handleScroll("left")}
          sx={{
            position: "absolute",
            left: 0,
            zIndex: 1,
            color: "#ffffff",
            padding: "5px",
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      )}

      <Box
        ref={categoryContainerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
          gap: 1,
          maxWidth: "85%",
        }}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => {
              if (category !== selectedCategory) {
                setCategory(category);
              }
            }}
            sx={{
              bgcolor: selectedCategory === category ? "#ffffff" : "#303030",
              color: selectedCategory === category ? "#000000" : "#E0E0E0",
              borderRadius: "20px",
              padding: "5px 15px",
              minWidth: "70px",
              border:
                selectedCategory === category ? "2px solid #ffffff" : "none",
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      {canScrollRight && (
        <IconButton
          onClick={() => handleScroll("right")}
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 1,
            color: "#ffffff",
            padding: "5px",
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
