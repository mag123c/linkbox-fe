import { Category } from "../../components/CategoryBar";
import api from "./api";

// ✅ 카테고리 목록 불러오기
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/categories");
    return response.data.data;
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
    const response = await api.post("/categories", { categoryName });
    return response.data.data;
  } catch (error) {
    console.error("카테고리 추가 중 오류 발생:", error);
    throw error;
  }
};
