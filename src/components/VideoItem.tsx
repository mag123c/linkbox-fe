import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function VideoItem({ video }: { video: any }) {
  return (
    <Card sx={{ backgroundColor: "#1E1E1E", mb: 2, borderRadius: "12px" }}>
      <CardMedia
        component="img"
        sx={{ height: 140 }}
        image={video.thumbnail}
        alt={video.title}
      />
      <CardContent>
        <Typography variant="h6" sx={{ color: "#ffffff" }}>
          {video.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#BBBBBB" }}>
          {video.description}
        </Typography>
        <Typography variant="caption" sx={{ color: "#888888" }}>
          조회수: {video.views}
        </Typography>
        <Typography variant="caption" sx={{ color: "#888888" }}>
          진행률: {video.progress}%
        </Typography>
      </CardContent>
    </Card>
  );
}
