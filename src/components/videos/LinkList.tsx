import { useState, useEffect } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import LinkItem from './LinkItem';

interface VideoItemProps {
    id: number;
    title: string;
    thumbnail: string;
    customComment: string;
    createdAt: string;
    url: string;
}

export default function LinkList({ videos: initialVideos, loading }: { videos: VideoItemProps[]; loading: boolean }) {
    const [videos, setVideos] = useState<VideoItemProps[]>(initialVideos);

    useEffect(() => {
        setVideos(initialVideos);
    }, [initialVideos]);

    return (
        <Box sx={{ mt: 2 }}>
            {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="rectangular"
                        width="100%"
                        height={120}
                        sx={{ bgcolor: '#303030', mb: 2, borderRadius: '12px' }}
                    />
                ))
            ) : videos.length > 0 ? (
                videos.map((video, _index) => (
                    <LinkItem
                        key={video.id}
                        video={video}
                        onUpdate={(id, newComment) => {
                            setVideos((prevVideos) =>
                                prevVideos.map((v) => (v.id === id ? { ...v, customComment: newComment } : v))
                            );
                        }}
                        onDelete={(id) => setVideos((prevVideos) => prevVideos.filter((v) => v.id !== id))}
                    />
                ))
            ) : (
                <Typography variant="body2" sx={{ color: '#888888', textAlign: 'center', mt: 2 }}>
                    이 카테고리에 링크된 영상이 없습니다.
                </Typography>
            )}
        </Box>
    );
}
