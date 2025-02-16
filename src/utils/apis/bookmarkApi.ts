import api from "./api";

// ✅ 특정 카테고리의 북마크 목록 가져오기
export const fetchVideosByCategory = async (
  category: string
): Promise<any[]> => {
  try {
    const response = await api.get(`/bookmarks/${category}`);
    return response.data;
  } catch (error) {
    console.error(`"${category}" 카테고리의 북마크 목록 불러오기 오류:`, error);
    return [];
  }
};
