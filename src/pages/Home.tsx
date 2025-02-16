import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import VideoList from "../components/VideoList";
import { fetchVideosByCategory } from "../utils/apis/bookmarkApi";
import { fetchCategories } from "../utils/apis/categoryApi";

export default function Home({
  categoryUpdated,
}: {
  categoryUpdated: boolean;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ 카테고리 목록 불러오기 (categoryUpdated가 변경될 때마다 실행됨)
  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);

        // ✅ 첫 번째 카테고리를 자동 선택
        if (fetchedCategories.length > 0 && !selectedCategory) {
          setSelectedCategory(fetchedCategories[0]);
        }
      } catch (error) {
        console.error("카테고리 불러오기 실패:", error);
      }
      setLoading(false);
    };

    loadCategories();
  }, [categoryUpdated]); // ✅ categoryUpdated가 변경될 때마다 실행됨

  // ✅ 선택된 카테고리에 따라 북마크 데이터 가져오기
  useEffect(() => {
    if (!selectedCategory) return;

    const loadVideos = async () => {
      setLoading(true);
      try {
        const fetchedVideos = await fetchVideosByCategory(selectedCategory);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error(
          `"${selectedCategory}" 카테고리의 북마크 불러오기 오류:`,
          error
        );
      }
      setLoading(false);
    };

    loadVideos();
  }, [selectedCategory]);

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
