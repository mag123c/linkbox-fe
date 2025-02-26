// CategoryDetailPage.tsx
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Fab, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategorySlider from '../components/categories/CategorySlider';
import AddLinkModal from '../components/modals/AddLinkModal';
import { fetchCategories } from '../services/categoryService';
import { fetchVideosByCategory } from '../services/linkService';
import { Category } from '../types/category';
import LinkList from '../components/videos/LinkList';

export default function CategoryDetailPage() {
    const { categoryId } = useParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(Number(categoryId));
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openAddVideoModal, setOpenAddVideoModal] = useState(false);
    const navigate = useNavigate();

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

    // 새 카테고리가 추가되면 상태에 추가하는 콜백
    const handleCategoryAdded = (newCategory: Category) => {
        setCategories((prev) => [...prev, newCategory]);
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
            <IconButton
                onClick={() => navigate('/')}
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '2%',
                    color: '#FFF',
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>

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

            <CategorySlider
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <LinkList videos={videos} loading={loading} />

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

            <AddLinkModal
                open={openAddVideoModal}
                onClose={() => setOpenAddVideoModal(false)}
                onVideoAdded={handleVideoAdded}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryAdded={handleCategoryAdded} // 콜백 전달
            />
        </Box>
    );
}
