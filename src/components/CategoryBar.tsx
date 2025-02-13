import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function CategoryBar({
  categories,
  setCategory,
}: {
  categories: string[];
  setCategory: (category: string) => void;
}) {
  const [selectedCategory, setSelectedCategoryState] = useState<string | null>(
    null
  );
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // 처음 입장 시 첫 번째 카테고리 자동 선택
  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryState(categories[0]);
      setCategory(categories[0]);
    }
  }, [categories, setCategory]);

  // 스크롤 가능 여부 업데이트
  const updateScrollButtons = () => {
    if (categoryContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        categoryContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // 스크롤 및 윈도우 리사이즈 감지
  useEffect(() => {
    const container = categoryContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
      updateScrollButtons(); // ✅ 초기 실행하여 버튼 표시 여부 결정
    }
    return () => {
      if (container)
        container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  // 즉시 이동 (반응 속도 개선)
  const handleScroll = (direction: "left" | "right") => {
    if (categoryContainerRef.current) {
      const moveAmount = categoryContainerRef.current.clientWidth * 0.8; // 이동 거리
      const newScrollLeft =
        direction === "left"
          ? categoryContainerRef.current.scrollLeft - moveAmount
          : categoryContainerRef.current.scrollLeft + moveAmount;

      // 즉시 이동 후 부드러운 효과 적용
      categoryContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "auto",
      });

      setTimeout(() => {
        categoryContainerRef.current?.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });
      }, 10); // 10ms 후 부드러운 효과 적용
    }
  };

  return (
    <Box
      sx={{
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
      {/* 왼쪽 이동 버튼 (왼쪽으로 이동할 수 있을 때만 표시) */}
      {canScrollLeft && (
        <IconButton
          onClick={() => handleScroll("left")}
          sx={{ color: "#ffffff", padding: "5px", minWidth: "30px" }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      )}

      {/* 카테고리 버튼 리스트 */}
      <Box
        ref={categoryContainerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
          gap: 1,
          maxWidth: "85%", // ✅ 카테고리 바 너비 증가
        }}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => {
              setSelectedCategoryState(category);
              setCategory(category);
            }}
            sx={{
              bgcolor: "#303030",
              color: "#E0E0E0",
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

      {/* 오른쪽 이동 버튼 (오른쪽으로 이동할 수 있을 때만 표시) */}
      {canScrollRight && (
        <IconButton
          onClick={() => handleScroll("right")}
          sx={{ color: "#ffffff", padding: "5px", minWidth: "30px" }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
