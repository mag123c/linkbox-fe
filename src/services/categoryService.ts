import {
  Category,
  CategoryListResponse,
  CategoryResponse,
} from "../types/category";
import axiosClient from "./axios-client";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosClient.get<CategoryListResponse>("/categories");
    return response.data.data || [];
  } catch (error) {
    console.error("카테고리 목록을 불러오는 중 오류 발생:", error);
    return [];
  }
};

// ✅ 카테고리 추가 API
export const addCategory = async (
  categoryName: string
): Promise<Category | null> => {
  if (!categoryName.trim()) {
    console.error("🚨 카테고리 이름이 비어 있습니다.");
    return null;
  }

  try {
    const response = await axiosClient.post<CategoryResponse>("/categories", {
      categoryName,
    });
    return response.data.data;
  } catch (error) {
    console.error("카테고리 추가 중 오류 발생:", error);
    throw error;
  }
};
