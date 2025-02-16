import api from "./api";

// ✅ 카테고리 목록 불러오기
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get("/bookmarks/categories");
    return response.data;
  } catch (error) {
    console.error("카테고리 목록을 불러오는 중 오류 발생:", error);
    return [];
  }
};

// ✅ 카테고리 추가 API
export const addCategory = async (categoryName: string) => {
  if (!categoryName.trim()) {
    console.error("🚨 카테고리 이름이 비어 있습니다.");
    return;
  }

  try {
    const response = await api.post("/bookmarks/categories", { categoryName });
    return response.data;
  } catch (error) {
    console.error("카테고리 추가 중 오류 발생:", error);
    throw error;
  }
};
