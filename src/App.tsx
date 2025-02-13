import { Container } from "@mui/material";
import { useState } from "react";
import AppNavBar from "./components/AppBar";
import CategoryBar from "./components/CategoryBar";
import VideoList from "./components/VideoList";

// 초기 데이터 (예제)
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
  {
    id: "3",
    title: "자연 다큐",
    category: "다큐",
    thumbnail: "https://via.placeholder.com/150",
    description: "자연을 담은 다큐멘터리.",
    views: 3000,
    progress: 30,
  },
];

const categories = [
  "개발",
  "예능",
  "다큐",
  "테스트",
  "테스트2",
  "테스트3",
  "테스트4",
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  return (
    <>
      <AppNavBar />
      <Container>
        <CategoryBar
          categories={categories}
          setCategory={setSelectedCategory}
        />
        <VideoList videos={[]} selectedCategory={selectedCategory} />
      </Container>
    </>
  );
}

export default App;
