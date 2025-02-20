import { Box, Dialog, DialogTitle, Avatar, IconButton } from '@mui/material';
import { useState } from 'react';
import { updateUser } from '../../services/userService';
import { User } from '../../types/user';

const AVATAR_COUNT = 12;

const getAvatarPath = (thumbnail: number) => `/avatars/avatar_${thumbnail}.png`;

export default function AvatarSelectionModal({
    open,
    onClose,
    user,
    onAvatarUpdated,
}: {
    open: boolean;
    onClose: () => void;
    user: User | null;
    onAvatarUpdated: (updatedUser: User) => void;
}) {
    const [loading, setLoading] = useState(false);

    const handleAvatarClick = async (thumbnail: number) => {
        if (!user) return;

        setLoading(true);
        const updatedUser = await updateUser(user.id, undefined, thumbnail);
        if (updatedUser) {
            onAvatarUpdated(updatedUser);
            onClose();
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                프로필 아바타 선택
            </DialogTitle>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 2,
                    padding: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {[...Array(AVATAR_COUNT)].map((_, index) => {
                    const avatarId = index + 1;
                    return (
                        <IconButton
                            key={avatarId}
                            onClick={() => handleAvatarClick(avatarId)}
                            disabled={loading}
                            sx={{
                                borderRadius: '50%',
                                transition: '0.2s',
                                '&:hover': { transform: 'scale(1.1)' },
                            }}
                        >
                            <Avatar
                                src={getAvatarPath(avatarId)}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    border: user?.thumbnail === avatarId ? '3px solid #1976D2' : 'none',
                                }}
                            />
                        </IconButton>
                    );
                })}
            </Box>
        </Dialog>
    );
}
