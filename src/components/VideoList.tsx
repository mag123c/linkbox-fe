import { Box } from "@mui/material";
import VideoItem from "./VideoItem";

export default function VideoList({
  videos,
  selectedCategory,
}: {
  videos: any[];
  selectedCategory: string;
}) {
  const filteredVideos = selectedCategory
    ? videos.filter((video) => video.category === selectedCategory)
    : videos;

  return (
    <Box sx={{ mt: 2 }}>
      {filteredVideos.map((video, index) => (
        <VideoItem key={index} video={video} />
      ))}
    </Box>
  );
}
