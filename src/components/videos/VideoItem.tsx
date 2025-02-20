import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface VideoItemProps {
    title: string;
    thumbnail: string;
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
                height: '80px',
                minWidth: '320px',
            }}
        >
            {/* 썸네일 */}
            <Box sx={{ width: '80px', height: '80px', flexShrink: 0 }}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    image={video.thumbnail}
                    alt={video.title}
                />
            </Box>

            {/* 텍스트 컨텐츠 */}
            <CardContent
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    minWidth: 0,
                    padding: '10px 15px',
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
                <Typography
                    variant="caption"
                    sx={{
                        color: '#BBBBBB',
                        position: 'absolute',
                        bottom: 5,
                        right: 10,
                        fontSize: '10px',
                    }}
                >
                    {new Date(video.createdAt)
                        .toLocaleDateString('ko-KR', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                        })
                        .replace(/\./g, '.')
                        .replace(/ /g, '')}
                </Typography>
            </CardContent>
        </Card>
    );
}
