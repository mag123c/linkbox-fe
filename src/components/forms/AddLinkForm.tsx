import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CategoryFolderSlider from '../categories/CategoryFolderSlider';
import AddCategoryForm from './AddCategoryForm';
import { Category } from '../../types/category';

interface UploadFormProps {
    categories: Category[];
    selectedCategory: number | null;
    onCategorySelect: (categoryId: number) => void;
    onSubmit: (videoUrl: string, videoComment: string, categoryId: number) => Promise<void>; // 비동기 함수
    onAddCategory: () => void;
}

export default function AddLinkForm({
    categories,
    selectedCategory,
    onCategorySelect,
    onSubmit,
    onAddCategory,
}: UploadFormProps) {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoComment, setVideoComment] = useState('');
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [loading, setLoading] = useState(false); // ✅ 로딩 상태 추가

    const handleSubmit = async () => {
        if (loading) return; // ✅ 로딩 중이면 중복 요청 방지
        if (!videoUrl.trim() || !selectedCategory) return;

        setLoading(true); // ✅ 로딩 시작
        try {
            await onSubmit(videoUrl, videoComment, selectedCategory);
            setVideoUrl(''); // 입력 필드 초기화
            setVideoComment('');
        } finally {
            setLoading(false); // ✅ 로딩 종료
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 500, padding: 2 }}>
            {/* 링크 입력 */}
            <Typography variant="subtitle2" sx={{ alignSelf: 'flex-start', mb: 1 }}>
                링크
            </Typography>
            <TextField
                fullWidth
                placeholder="https://example.com"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                variant="outlined"
                sx={{
                    input: { color: '#000' },
                    label: { color: '#555' },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        borderColor: '#DDD',
                        '&:hover fieldset': { borderColor: '#AAA' },
                        '&.Mui-focused fieldset': { borderColor: '#777' },
                    },
                }}
            />

            {/* 폴더 선택 */}
            <Box sx={{ width: '100%', mt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">폴더 선택</Typography>
                    <IconButton onClick={() => setOpenCategoryModal(true)}>
                        <AddIcon />
                    </IconButton>
                </Box>

                {/* ✅ 기존 CategoryFolderGrid 대신 가로 슬라이드 적용 */}
                <CategoryFolderSlider
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={onCategorySelect}
                />
            </Box>

            {/* 링크 코멘트 */}
            <Typography variant="subtitle2" sx={{ alignSelf: 'flex-start', mt: 3, mb: 1 }}>
                링크 코멘트
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="저장한 링크에 대해 간단하게 메모해보세요"
                value={videoComment}
                onChange={(e) => setVideoComment(e.target.value)}
                variant="outlined"
                sx={{
                    input: { color: '#000' },
                    label: { color: '#555' },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        borderColor: '#DDD',
                        '&:hover fieldset': { borderColor: '#AAA' },
                        '&.Mui-focused fieldset': { borderColor: '#777' },
                    },
                }}
            />

            {/* 등록 버튼 */}
            <Button
                onClick={handleSubmit}
                fullWidth
                disabled={loading} // ✅ 로딩 중 버튼 비활성화
                sx={{
                    backgroundColor: loading ? '#AAA' : '#A88FFF', // ✅ 로딩 중 색상 변경
                    color: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px',
                    fontSize: '16px',
                    textTransform: 'none',
                    mt: 3,
                    '&:hover': { backgroundColor: loading ? '#AAA' : '#9776FF' },
                }}
            >
                {loading ? (
                    <>
                        <CircularProgress size={20} sx={{ color: '#FFF', mr: 1 }} /> 등록 중...
                    </>
                ) : (
                    '등록 완료'
                )}
            </Button>

            {/* 카테고리 추가 모달 */}
            <Dialog open={openCategoryModal} onClose={() => setOpenCategoryModal(false)}>
                <DialogTitle>새 폴더 추가</DialogTitle>
                <DialogContent>
                    <AddCategoryForm
                        open={openCategoryModal}
                        onClose={() => setOpenCategoryModal(false)}
                        onCategoryAdded={onAddCategory}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
}
