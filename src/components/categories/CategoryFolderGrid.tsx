import { Box, IconButton, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { Category } from '../../types/category';
import DeleteIcon from '@mui/icons-material/Delete';
import { PASTEL_COLORS } from '../../utils/pastelColors';
import { useNavigate } from 'react-router-dom';

interface CategoryFolderGridProps {
    categories: Category[];
    isSelectable?: boolean;
    selectedCategory?: number | null;
    setSelectedCategory?: (categoryId: number) => void;
    onDeleteCategory?: (categoryId: number) => void;
}

export default function CategoryFolderGrid({
    categories,
    isSelectable = false,
    selectedCategory,
    setSelectedCategory,
    onDeleteCategory,
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
                        position: 'relative',
                    }}
                >
                    <FolderIcon
                        sx={{
                            fontSize: 40,
                            color: getColorByCategoryId(category.id),
                        }}
                    />
                    <Typography sx={{ fontWeight: 'bold', color: '#000', mt: 1 }}>{category.name}</Typography>
                    {/* 삭제 버튼 */}
                    {onDeleteCategory && (
                        <IconButton
                            onClick={(event) => {
                                event.stopPropagation();
                                onDeleteCategory(category.id);
                            }}
                            sx={{
                                position: 'absolute',
                                top: 1,
                                right: 5,
                                color: '#A0A0A0',
                                zIndex: 100,
                                pointerEvents: 'auto',
                                '&:hover': { color: '#DB4455' },
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            ))}
        </Box>
    );
}
