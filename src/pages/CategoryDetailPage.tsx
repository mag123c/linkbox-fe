import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, IconButton, Typography, Fab } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import CategorySlider from '../components/categories/CategorySlider';
import VideoList from '../components/videos/VideoList';
import { fetchCategories } from '../services/categoryService';
import { fetchVideosByCategory } from '../services/linkService';
import { Category } from '../types/category';
import AddVideoModal from '../components/modals/AddVideoModal';

export default function CategoryDetailPage() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(Number(categoryId));
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openAddVideoModal, setOpenAddVideoModal] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
                setSelectedCategory(Number(categoryId));
            } catch (error) {
                console.error('카테고리 불러오기 실패:', error);
            }
        };

        loadCategories();
    }, [categoryId]);

    useEffect(() => {
        if (!selectedCategory) return;

        const loadVideos = async () => {
            setLoading(true);
            try {
                const fetchedVideos = await fetchVideosByCategory(selectedCategory);
                setVideos(fetchedVideos);
            } catch (error) {
                console.error('비디오 불러오기 실패:', error);
            }
            setLoading(false);
        };

        loadVideos();
    }, [selectedCategory]);

    const handleVideoAdded = async () => {
        setOpenAddVideoModal(false);
        if (selectedCategory) {
            const updatedVideos = await fetchVideosByCategory(selectedCategory);
            setVideos(updatedVideos);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 500,
                padding: 2,
                position: 'relative',
            }}
        >
            {/* 뒤로 가기 버튼 - 왼쪽 상단 고정 */}
            <IconButton
                onClick={() => navigate('/')}
                sx={{
                    position: 'absolute',
                    top: '2%',
                    left: '2%',
                    color: '#FFF',
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>

            {/* 카테고리 제목 - 정중앙 정렬 */}
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#FFF',
                    width: '100%',
                    mt: 2,
                }}
            >
                {categories.find((cat) => cat.id === selectedCategory)?.name || '카테고리'}
            </Typography>

            {/* 카테고리 선택 슬라이더 */}
            <CategorySlider
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {/* 영상 리스트 */}
            <VideoList videos={videos} loading={loading} />

            {/* ✅ 비디오 추가 버튼 */}
            <Fab
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: 'max(20px, 2%)',
                    right: 'max(20px, 2%)',
                    zIndex: 10,
                }}
                onClick={() => setOpenAddVideoModal(true)}
            >
                <AddIcon />
            </Fab>

            {/* ✅ 비디오 추가 모달 */}
            <AddVideoModal
                open={openAddVideoModal}
                onClose={() => setOpenAddVideoModal(false)}
                onVideoAdded={handleVideoAdded}
                categories={categories}
                selectedCategory={selectedCategory}
            />
        </Box>
    );
}
