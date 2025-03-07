import { Link, LinkListResponse, LinkResponse } from '../types/link';
import axiosClient from './axios-client';

// ✅ 특정 카테고리의 링크 목록 가져오기
export const fetchVideosByCategory = async (categoryId: number): Promise<Link[]> => {
    try {
        const response = await axiosClient.get<LinkListResponse>(`/links/${categoryId}`);
        return response.data.data || [];
    } catch (error) {
        console.error(`카테고리의 링크 목록 불러오기 오류:`, error);
        return [];
    }
};

// ✅ 링크 추가하기
export const addLinks = async (metadata: { url: string; memo: string }, categoryId: number): Promise<Link | null> => {
    try {
        const response = await axiosClient.post<LinkResponse>(`/links/${categoryId}`, metadata);
        return response.data.data;
    } catch (error) {
        console.error('링크 추가 오류:', error);
        throw error;
    }
};

// ✅ 링크 삭제 API
export const deleteLink = async (linkId: number): Promise<void> => {
    await axiosClient.delete(`/links/${linkId}`);
};

// ✅ 링크 수정 API (메모 수정)
export const updateLink = async (linkId: number, newComment: string): Promise<void> => {
    await axiosClient.put(`/links/${linkId}`, { memo: newComment });
};
