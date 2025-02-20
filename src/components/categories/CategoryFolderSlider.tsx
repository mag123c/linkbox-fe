import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { Category } from '../../types/category';
import { PASTEL_COLORS } from '../../utils/pastelColors';

interface CategoryFolderSliderProps {
    categories: Category[];
    selectedCategory?: number | null;
    setSelectedCategory?: (categoryId: number) => void;
}

export default function CategoryFolderSlider({
    categories,
    selectedCategory,
    setSelectedCategory,
}: CategoryFolderSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const getColorByCategoryId = (categoryId: number) => {
        const colorIndex = categoryId % PASTEL_COLORS.length;
        return PASTEL_COLORS[colorIndex];
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                display: 'flex',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                gap: 2,
                padding: '10px 0',
                width: '100%',
                maxWidth: 500,
                scrollbarWidth: 'none', // 파이어폭스 스크롤 숨김
                '&::-webkit-scrollbar': { display: 'none' }, // 크롬, 사파리 스크롤 숨김
            }}
        >
            {categories.map((category) => (
                <Box
                    key={category.id}
                    onClick={() => setSelectedCategory?.(category.id)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '100px',
                        padding: 2,
                        backgroundColor: selectedCategory === category.id ? '#DDEEFF' : '#F5F5F5',
                        borderRadius: 12,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            opacity: 0.8,
                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                        },
                    }}
                >
                    <FolderIcon
                        sx={{
                            fontSize: 40,
                            color: getColorByCategoryId(category.id),
                        }}
                    />
                    <Typography sx={{ fontWeight: 'bold', color: '#000', mt: 1, whiteSpace: 'nowrap' }}>
                        {category.name}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}
