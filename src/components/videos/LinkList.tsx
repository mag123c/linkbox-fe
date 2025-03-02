import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import LinkItem from "./LinkItem";

interface VideoItemProps {
  id: number;
  title: string;
  thumbnail: string;
  customComment: string;
  createdAt: string;
  url: string;
}

export default function LinkList({
  videos: initialVideos,
  loading,
}: {
  videos: VideoItemProps[];
  loading: boolean;
}) {
  const [videos, setVideos] = useState<VideoItemProps[]>(initialVideos);
  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 600;

  useEffect(() => {
    setVideos(initialVideos);
  }, [initialVideos]);

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={120}
            sx={{ bgcolor: "#303030", mb: 2, borderRadius: "12px" }}
          />
        ))
      ) : videos.length > 0 ? (
        videos.map((video, _index) => (
          <Box
            key={video.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: isSmallScreen ? "90%" : "80%",
              maxWidth: isSmallScreen ? "100%" : "800px",
              minWidth: "320px",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <LinkItem
              key={video.id}
              video={video}
              onUpdate={(id, newComment) => {
                setVideos((prevVideos) =>
                  prevVideos.map((v) =>
                    v.id === id ? { ...v, customComment: newComment } : v
                  )
                );
              }}
              onDelete={(id) =>
                setVideos((prevVideos) => prevVideos.filter((v) => v.id !== id))
              }
            />
          </Box>
        ))
      ) : (
        <Typography
          variant="body2"
          sx={{ color: "#888888", textAlign: "center", mt: 2 }}
        >
          이 카테고리에 링크된 영상이 없습니다.
        </Typography>
      )}
    </Box>
  );
}
