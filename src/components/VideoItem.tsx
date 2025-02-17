import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface VideoItemProps {
    title: string;
    thumbnailUrl: string;
    customComment: string;
    createdAt: string;
}

export default function VideoItem({ video }: { video: VideoItemProps }) {
    return (
        <Card
            sx={{
                display: 'flex',
                backgroundColor: '#1E1E1E',
                mb: 2,
                borderRadius: '12px',
                overflow: 'hidden',
                width: '100%',
            }}
        >
            <Box sx={{ width: 120, height: 90, flexShrink: 0 }}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    image={video.thumbnailUrl}
                    alt={video.title}
                />
            </Box>
            <CardContent
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    minWidth: 0,
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{ color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {video.title}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{ color: '#BBBBBB', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {video.customComment}
                </Typography>
                <Typography variant="caption" sx={{ color: '#BBBBBB', position: 'absolute', bottom: 5, right: 10 }}>
                    {new Date(video.createdAt)
                        .toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })
                        .replace(/\./g, '.')
                        .replace(/ /g, '')}
                </Typography>
            </CardContent>
        </Card>
    );
}
