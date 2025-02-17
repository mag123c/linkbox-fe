import api from './api';

// ✅ 특정 카테고리의 북마크 목록 가져오기
export const fetchVideosByCategory = async (category: string): Promise<any[]> => {
    try {
        const response = await api.get(`/bookmarks/${category}`);
        return response.data;
    } catch (error) {
        console.error(`"${category}" 카테고리의 북마크 목록 불러오기 오류:`, error);
        return [];
    }
};

// ✅ 북마크 추가하기
export const addBookmark = async (bookmark: { url: string; title: string; categoryName: string }): Promise<void> => {
    try {
        await api.post('/bookmarks', bookmark);
    } catch (error) {
        console.error('북마크 추가 오류:', error);
    }
};
