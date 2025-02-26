// AddCategoryForm.tsx
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { addCategory } from '../../services/categoryService';
import { Category } from '../../types/category';

interface AddCategoryFormProps {
    open: boolean;
    onClose: () => void;
    onCategoryAdded: (newCategory: Category) => void;
}

export default function AddCategoryForm({ open, onClose, onCategoryAdded }: AddCategoryFormProps) {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isDuplicate, setIsDuplicate] = useState(false);

    const handleSubmit = async () => {
        if (!categoryName.trim()) return;
        setError(null);
        setIsDuplicate(false);

        try {
            const newCategory = await addCategory(categoryName);
            onCategoryAdded(newCategory!);
            setCategoryName('');
        } catch (error: any) {
            if (error.response?.data?.code === 400307) {
                setIsDuplicate(true);
            } else {
                setError('폴더 추가에 실패했습니다.');
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>새 폴더 추가</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="폴더 이름"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    error={isDuplicate}
                    helperText={isDuplicate ? '이미 등록된 카테고리입니다.' : ''}
                    sx={{
                        mt: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            '&.Mui-focused fieldset': {
                                borderColor: isDuplicate ? '#FF0000' : '#A88FFF',
                            },
                            '& fieldset': {
                                borderColor: isDuplicate ? '#FF0000' : '#DDD',
                            },
                        },
                    }}
                />
                {error && (
                    <Typography variant="body2" sx={{ color: 'red', textAlign: 'center', mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>취소</Button>
                <Button onClick={handleSubmit}>추가</Button>
            </DialogActions>
        </Dialog>
    );
}
