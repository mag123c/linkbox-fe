import { Box, Card, CardContent, CardMedia, IconButton, Modal, TextField, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { deleteLink, updateLink } from '../../services/linkService';

interface VideoItemProps {
    id: number;
    title: string;
    thumbnail: string;
    customComment: string;
    createdAt: string;
    url: string;
    onDelete?: (id: number) => void;
    onUpdate?: (id: number, newComment: string) => void;
}

export default function LinkItem({
    video,
    onDelete,
    onUpdate,
}: {
    video: VideoItemProps;
    onDelete: (id: number) => void;
    onUpdate: (id: number, newComment: string) => void;
}) {
    const [openModal, setOpenModal] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(video.customComment);
    const [loading, setLoading] = useState(false);

    // 링크 삭제 핸들러
    const handleDelete = async () => {
        try {
            await deleteLink(video.id);
            onDelete(video.id);
        } catch (error) {
            console.error('❌ 링크 삭제 실패:', error);
        }
    };

    // 링크 업데이트 핸들러
    const handleUpdate = async () => {
        if (!updatedComment.trim()) return;
        setLoading(true);
        await updateLink(video.id, updatedComment);
        onUpdate(video.id, updatedComment);
        setOpenModal(false);
        setLoading(false);
    };

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    backgroundColor: '#1E1E1E',
                    mb: 2,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    width: '100%',
                    height: '80px',
                    minWidth: '320px',
                    position: 'relative',
                }}
            >
                {/* 삭제 버튼 */}
                <IconButton
                    onClick={(event) => {
                        console.log('TEST');
                        event.stopPropagation();
                        handleDelete();
                    }}
                    sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        color: 'white',
                        opacity: 200,
                        padding: 0,
                        pointerEvents: 'auto',
                        '&:hover': { color: '#FF1C1C' },
                        zIndex: 10,
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>

                {/* 썸네일 - 클릭 시 URL 이동 */}
                <Box
                    sx={{ width: '80px', height: '80px', flexShrink: 0, cursor: 'pointer' }}
                    onClick={() => (window.location.href = video.url)}
                >
                    <CardMedia
                        component="img"
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        image={video.thumbnail}
                        alt={video.title}
                    />
                </Box>

                {/* 텍스트 컨텐츠 - 클릭 시 모달 열림 */}
                <Box sx={{ flex: 1 }} onClick={() => setOpenModal(true)}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            position: 'relative',
                            minWidth: 0,
                            padding: '10px 15px',
                            cursor: 'pointer',
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: '#ffffff',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: '14px',
                                fontWeight: 'bold',
                            }}
                        >
                            {video.title}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#BBBBBB',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: '12px',
                            }}
                        >
                            {video.customComment}
                        </Typography>
                    </CardContent>
                    <Typography
                        variant="caption"
                        sx={{
                            color: '#BBBBBB',
                            alignSelf: 'flex-end',
                            position: 'absolute',
                            bottom: 5,
                            right: 10,
                            fontSize: '10px',
                        }}
                    >
                        {new Date(video.createdAt).toLocaleDateString('ko-KR', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                        })}
                    </Typography>
                </Box>
            </Card>

            {/* 메모 수정 모달 */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: '#1E1E1E',
                        p: 3,
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="h6" sx={{ color: '#FFF', mb: 2 }}>
                        메모 수정
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={updatedComment}
                        onChange={(e) => setUpdatedComment(e.target.value)}
                        variant="outlined"
                        sx={{
                            input: { color: '#FFFFFF' },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                borderColor: '#FFF',
                                '&:hover fieldset': { borderColor: '#AAA' },
                                '&.Mui-focused fieldset': { borderColor: '#777' },
                            },
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            onClick={() => setOpenModal(false)}
                            sx={{ backgroundColor: '#FFFFFF', color: '#000', mr: 2 }}
                        >
                            취소
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            sx={{
                                backgroundColor: '#A88FFF',
                                color: '#FFFFFF',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                '&:hover': { backgroundColor: '#9776FF' },
                            }}
                            disabled={loading}
                        >
                            {loading ? '저장 중...' : '저장'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
