import { Box, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { Category } from '../../types/category';
import { PASTEL_COLORS } from '../../utils/pastelColors';
import { useNavigate } from 'react-router-dom';

interface CategoryFolderGridProps {
    categories: Category[];
    isSelectable?: boolean; // ✅ 선택 모드 (UploadForm에서 사용)
    selectedCategory?: number | null;
    setSelectedCategory?: (categoryId: number) => void;
}

export default function CategoryFolderGrid({
    categories,
    isSelectable = false,
    selectedCategory,
    setSelectedCategory,
}: CategoryFolderGridProps) {
    const navigate = useNavigate();

    const getColorByCategoryId = (categoryId: number) => {
        const colorIndex = categoryId % PASTEL_COLORS.length;
        return PASTEL_COLORS[colorIndex];
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 2,
                width: '100%',
                maxWidth: 500,
                padding: 2,
            }}
        >
            {categories.map((category) => (
                <Box
                    key={category.id}
                    onClick={() => {
                        if (isSelectable && setSelectedCategory) {
                            setSelectedCategory(category.id); // ✅ 폴더 선택 모드
                        } else {
                            navigate(`/categories/${category.id}`); // ✅ 라우팅 모드
                        }
                    }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                        backgroundColor: selectedCategory === category.id ? '#DDEEFF' : '#F5F5F5',
                        borderRadius: 8,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            opacity: 0.5,
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
                    <Typography sx={{ fontWeight: 'bold', color: '#000', mt: 1 }}>{category.name}</Typography>
                </Box>
            ))}
        </Box>
    );
}
