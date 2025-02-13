import { Container } from "@mui/material";
import { useState } from "react";
import CategoryBar from "../components/CategoryBar";
import VideoList from "../components/VideoList";

const initialVideos = [
  {
    id: "1",
    title: "React 강의",
    category: "개발",
    thumbnail: "https://via.placeholder.com/150",
    description: "React 강의 영상입니다.",
    views: 1000,
    progress: 50,
  },
  {
    id: "2",
    title: "예능 하이라이트",
    category: "예능",
    thumbnail: "https://via.placeholder.com/150",
    description: "예능 영상입니다.",
    views: 5000,
    progress: 80,
  },
];

const categories = ["전체", "개발", "예능", "다큐"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  return (
    <Container>
      <CategoryBar categories={categories} setCategory={setSelectedCategory} />
      <VideoList videos={initialVideos} selectedCategory={selectedCategory} />
    </Container>
  );
}
