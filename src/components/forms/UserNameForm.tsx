import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

export default function UserNameForm({
    open,
    onClose,
    onUserNameUpdated,
}: {
    open: boolean;
    onClose: () => void;
    onUserNameUpdated: (newName: string) => void;
}) {
    const [name, setName] = useState('');

    const handleSave = () => {
        if (!name.trim()) return;
        onUserNameUpdated(name);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{ '& .MuiPaper-root': { backgroundColor: '#1E1E1E', borderRadius: '16px', padding: '16px' } }}
        >
            <DialogTitle>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>이름 변경</Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="새로운 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    variant="outlined"
                    sx={{
                        input: { color: '#FFFFFF' },
                        label: { color: '#BBBBBB' },
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
                    onClick={onClose}
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
                    onClick={handleSave}
                    sx={{
                        backgroundColor: '#FF3B30',
                        color: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '8px 20px',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#CC2A24' },
                    }}
                >
                    변경
                </Button>
            </DialogActions>
        </Dialog>
    );
}
