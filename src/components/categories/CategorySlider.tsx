import { useRef, useEffect, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Category } from '../../types/category';
import { useNavigate } from 'react-router-dom';

export default function CategorySlider({
    categories,
    selectedCategory,
    setSelectedCategory,
}: {
    categories: Category[];
    selectedCategory: number | null;
    setSelectedCategory: (categoryId: number) => void;
}) {
    const categoryContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const updateScrollButtons = () => {
            if (categoryContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = categoryContainerRef.current;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
            }
        };

        const container = categoryContainerRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
            window.addEventListener('resize', updateScrollButtons);
            updateScrollButtons();
        }

        return () => {
            if (container) container.removeEventListener('scroll', updateScrollButtons);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, []);

    const handleScroll = (direction: 'left' | 'right') => {
        if (categoryContainerRef.current) {
            const moveAmount = categoryContainerRef.current.clientWidth * 0.8;
            const newScrollLeft =
                direction === 'left'
                    ? categoryContainerRef.current.scrollLeft - moveAmount
                    : categoryContainerRef.current.scrollLeft + moveAmount;

            categoryContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth',
            });
        }
    };

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategory(categoryId);
        navigate(`/categories/${categoryId}`);
    };

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                overflow: 'hidden',
                pb: 2,
            }}
        >
            {/* 카테고리 슬라이드 */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    position: 'relative',
                }}
            >
                {canScrollLeft && (
                    <IconButton
                        onClick={() => handleScroll('left')}
                        sx={{ position: 'absolute', left: 0, zIndex: 1, color: '#555' }}
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                )}

                <Box
                    ref={categoryContainerRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        scrollBehavior: 'smooth',
                        gap: 1,
                        padding: '10px 0',
                        maxWidth: '85%',
                        position: 'relative',
                    }}
                >
                    {categories.map((category) => (
                        <Box key={category.id} sx={{ position: 'relative', display: 'inline-block' }}>
                            <Button
                                variant="contained"
                                onClick={() => handleCategoryClick(category.id)}
                                sx={{
                                    bgcolor: selectedCategory === category.id ? '#ffffff' : '#303030',
                                    color: selectedCategory === category.id ? '#000000' : '#E0E0E0',
                                    borderRadius: '20px',
                                    padding: '5px 15px',
                                    minWidth: '70px',
                                    border: selectedCategory === category.id ? '2px solid #ffffff' : 'none',
                                }}
                            >
                                {category.name}
                            </Button>
                        </Box>
                    ))}
                </Box>

                {canScrollRight && (
                    <IconButton
                        onClick={() => handleScroll('right')}
                        sx={{ position: 'absolute', right: 0, zIndex: 1, color: '#555' }}
                    >
                        <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}
