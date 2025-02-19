import api from "./api";

// ✅ 특정 카테고리의 링크 목록 가져오기
export const fetchVideosByCategory = async (
  categoryId: number
): Promise<any[]> => {
  try {
    const response = await api.get(`/links/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`카테고리의 링크 목록 불러오기 오류:`, error);
    return [];
  }
};

// ✅ 링크 추가하기
export const addLinks = async (
  metadata: {
    url: string;
    memo: string;
  },
  categoryId: number
): Promise<void> => {
  console.log(metadata);
  try {
    await api.post(`/links/${categoryId}`, metadata);
  } catch (error) {
    console.error("링크 추가 오류:", error);
  }
};
