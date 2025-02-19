import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryBar, { Category } from "../components/CategoryBar";
import VideoList from "../components/VideoList";
import { fetchVideosByCategory } from "../utils/apis/linksApi";

export default function Home({
  categories,
  selectedCategory,
  setSelectedCategory,
  videoUpdated,
}: {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  videoUpdated: boolean;
}) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!selectedCategory) return;

    const loadVideos = async () => {
      setLoading(true);
      try {
        const fetchedVideos = await fetchVideosByCategory(
          categories.find((cat) => cat.name === selectedCategory)!.id
        );
        setVideos(fetchedVideos);
      } catch (error) {
        console.error(
          `"${selectedCategory}" 카테고리의 링크 불러오기 오류:`,
          error
        );
      }
      setLoading(false);
    };

    loadVideos();
  }, [selectedCategory, videoUpdated]);

  return (
    <Container>
      <CategoryBar
        categories={categories}
        setCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <VideoList
        videos={videos}
        selectedCategory={selectedCategory || ""}
        loading={loading}
      />
    </Container>
  );
}
