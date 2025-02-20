import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CategoryFolderSlider from '../categories/CategoryFolderSlider';
import { Category } from '../../types/category';
import { addLinks } from '../../services/linkService';
import AddCategoryForm from '../forms/AddCategoryForm';

interface AddVideoModalProps {
    open: boolean;
    onClose: () => void;
    onVideoAdded: () => void;
    categories: Category[];
    selectedCategory: number | null;
}

export default function AddVideoModal({
    open,
    onClose,
    onVideoAdded,
    categories,
    selectedCategory,
}: AddVideoModalProps) {
    const [videoUrl, setVideoUrl] = useState('');
    const [memo, setMemo] = useState('');
    const [selectedFolder, setSelectedFolder] = useState<number | null>(selectedCategory);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isValidUrl, setIsValidUrl] = useState(true);

    useEffect(() => {
        if (open && selectedCategory) {
            setSelectedFolder(selectedCategory);
        }
    }, [open, selectedCategory]);

    const validateUrl = (url: string) => {
        return /^(https?:\/\/)/.test(url);
    };

    const handleAddVideo = async () => {
        if (!videoUrl.trim() || !selectedFolder) return;

        if (!validateUrl(videoUrl)) {
            setIsValidUrl(false);
            return;
        }
        setIsValidUrl(true);
        setError(null); // ✅ 기존 에러 초기화

        try {
            await addLinks({ url: videoUrl, memo: memo.trim() || '' }, selectedFolder);
            onVideoAdded();
            handleClose();
        } catch (error) {
            setError('링크 등록 실패.');
        }
    };
    const handleClose = () => {
        setVideoUrl('');
        setMemo('');
        setSelectedFolder(selectedCategory);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: '#FFF',
                    borderRadius: '16px',
                    padding: '16px',
                },
            }}
        >
            <DialogTitle>
                <Typography sx={{ color: '#000', fontWeight: 'bold', fontSize: '18px' }}>비디오 추가</Typography>
            </DialogTitle>
            <DialogContent>
                {/* 링크 입력 */}
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    링크
                </Typography>
                <TextField
                    fullWidth
                    placeholder="https://example.com"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    autoFocus
                    variant="outlined"
                    error={!isValidUrl}
                    helperText={!isValidUrl ? '올바른 URL 형식이 아닙니다. (https:// 포함)' : ''}
                    sx={{
                        mt: 2,
                        mb: 5,
                        input: { color: '#000' },
                        label: { color: '#555' },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            borderColor: isValidUrl ? '#DDD' : '#FF0000',
                            '&:hover fieldset': { borderColor: isValidUrl ? '#AAA' : '#FF0000' },
                            '&.Mui-focused fieldset': { borderColor: isValidUrl ? '#777' : '#FF0000' },
                        },
                    }}
                />

                {error && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'red',
                            textAlign: 'center',
                            mt: 2,
                        }}
                    >
                        {error}
                    </Typography>
                )}

                {/* 폴더 선택 */}
                <Box sx={{ mb: 5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="subtitle2">폴더 선택</Typography>
                        <IconButton onClick={() => setOpenCategoryModal(true)}>
                            <AddIcon />
                        </IconButton>
                    </Box>

                    {/* ✅ 가로 슬라이드 폴더 선택 적용 */}
                    <CategoryFolderSlider
                        categories={categories}
                        selectedCategory={selectedFolder}
                        setSelectedCategory={setSelectedFolder}
                    />
                </Box>

                {/* 링크 코멘트 */}
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    메모
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="저장한 링크에 대해 간단하게 메모해보세요"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    variant="outlined"
                    sx={{
                        mt: 2,
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
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        backgroundColor: '#CCC',
                        color: '#000',
                        borderRadius: '20px',
                        padding: '12px 24px',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#AAA' },
                    }}
                >
                    닫기
                </Button>
                <Button
                    onClick={handleAddVideo}
                    sx={{
                        backgroundColor: '#A88FFF',
                        color: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '12px 24px',
                        fontSize: '16px',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#9776FF' },
                    }}
                >
                    등록 완료
                </Button>
            </DialogActions>

            {/* ✅ 폴더 추가 모달 */}
            <Dialog open={openCategoryModal} onClose={() => setOpenCategoryModal(false)}>
                <DialogTitle>새 폴더 추가</DialogTitle>
                <DialogContent>
                    <AddCategoryForm
                        open={openCategoryModal}
                        onClose={() => setOpenCategoryModal(false)}
                        onCategoryAdded={() => {}}
                    />
                </DialogContent>
            </Dialog>
        </Dialog>
    );
}
