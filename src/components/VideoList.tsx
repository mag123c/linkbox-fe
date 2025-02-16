import { Box, Skeleton } from "@mui/material";
import VideoItem from "./VideoItem";

export default function VideoList({
  videos,
  selectedCategory,
  loading,
}: {
  videos: any[];
  selectedCategory: string;
  loading: boolean;
}) {
  const filteredVideos = videos.filter(
    (video) => video.category === selectedCategory
  );

  return (
    <Box sx={{ mt: 2 }}>
      {loading
        ? filteredVideos.map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="100%"
              height={120}
              sx={{ bgcolor: "#303030", mb: 2, borderRadius: "12px" }}
            />
          ))
        : filteredVideos.map((video, index) => (
            <VideoItem key={index} video={video} />
          ))}
    </Box>
  );
}
