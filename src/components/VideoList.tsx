import { Box, Skeleton, Typography } from '@mui/material';
import VideoItem from './VideoItem';

export default function VideoList({ videos, loading }: { videos: any[]; selectedCategory: string; loading: boolean }) {
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
                videos.map((video, index) => <VideoItem key={index} video={video} />)
            ) : (
                <Typography variant="body2" sx={{ color: '#888888', textAlign: 'center', mt: 2 }}>
                    이 카테고리에 북마크된 영상이 없습니다.
                </Typography>
            )}
        </Box>
    );
}
