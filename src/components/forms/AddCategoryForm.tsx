import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { addCategory } from '../../services/categoryService';

export default function AddCategoryForm({
    open,
    onClose,
    onCategoryAdded,
}: {
    open: boolean;
    onClose: () => void;
    onCategoryAdded: () => void;
}) {
    const [categoryName, setCategoryName] = useState('');

    const handleAddCategory = async () => {
        if (!categoryName.trim()) return;
        try {
            await addCategory(categoryName);
            onCategoryAdded();
            handleClose();
        } catch (error) {
            console.error('카테고리 추가 실패:', error);
        }
    };

    const handleClose = () => {
        setCategoryName('');
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: '#1E1E1E',
                    borderRadius: '16px',
                    padding: '16px',
                },
            }}
        >
            <DialogTitle>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>카테고리 추가</Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="카테고리 이름"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    autoFocus
                    variant="outlined"
                    sx={{
                        input: {
                            color: '#FFFFFF',
                        },
                        label: {
                            color: '#BBBBBB',
                        },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            borderColor: '#444',
                            '&:hover fieldset': { borderColor: '#888' },
                            '&.Mui-focused fieldset': { borderColor: '#FFF' },
                        },
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        backgroundColor: '#444',
                        color: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '8px 20px',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#666' },
                    }}
                >
                    닫기
                </Button>
                <Button
                    onClick={handleAddCategory}
                    sx={{
                        backgroundColor: '#FF3B30',
                        color: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '8px 20px',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#CC2A24' },
                    }}
                >
                    추가
                </Button>
            </DialogActions>
        </Dialog>
    );
}
