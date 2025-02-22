import Cookie from "js-cookie";
import { User } from "../types/user";
import axiosClient from "./axios-client";

// 유저 정보 가져오기
export const getUserInCookies = async (): Promise<User | null> => {
  try {
    const user = Cookie.get("links_user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("유저 정보 불러오기 실패:", error);
    return null;
  }
};

// 유저 정보 업데이트 (이름 & 썸네일 가능)
export const updateUser = async (
  userId: number,
  newName?: string,
  newThumbnail?: number
): Promise<User | null> => {
  try {
    const payload: Partial<User> = {};
    if (newName) payload.name = newName;
    if (newThumbnail !== undefined) payload.thumbnail = newThumbnail;

    console.log(payload);

    const response = await axiosClient.patch(
      `/users/update/${userId}`,
      payload
    );
    console.log(response);
    const updatedUser = response.data.data;

    return updatedUser;
  } catch (error) {
    console.error("유저 정보 변경 실패:", error);
    return null;
  }
};

//유저 정보 with AccessToken
export const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await axiosClient.get("/users/me");
    const user = response.data;
    return user;
  } catch (error) {
    console.error("유저 정보 불러오기 실패:", error);
    return null;
  }
};
