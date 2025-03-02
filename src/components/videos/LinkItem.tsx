import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { deleteLink, updateLink } from "../../services/linkService";

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

  const handleDelete = async () => {
    try {
      await deleteLink(video.id);
      onDelete(video.id);
    } catch (error) {
      console.error("❌ 링크 삭제 실패:", error);
    }
  };

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
          display: "flex",
          backgroundColor: "#1E1E1E",
          mb: 2,
          borderRadius: "12px",
          overflow: "hidden",
          width: "100%",
          height: "80px",
          minWidth: "320px",
          position: "relative",
        }}
      >
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            handleDelete();
          }}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            color: "white",
            "&:hover": { backgroundColor: "rgba(255,0,0,1)" },
            width: 20,
            height: 20,
            padding: 0,
            zIndex: 10,
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            width: "80px",
            height: "80px",
            flexShrink: 0,
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = video.url)}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            image={video.thumbnail}
            alt={video.title}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0, // 이 부분이 중요합니다 - flexbox 아이템이 최소 너비 이하로 축소되게 합니다
            overflow: "hidden", // 컨텐츠가 넘칠 때 숨기기
          }}
          onClick={() => setOpenModal(true)}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px 15px",
              cursor: "pointer",
              overflow: "hidden", // 컨텐츠가 넘칠 때 숨기기
              width: "100%", // 너비 설정
              height: "100%", // 높이 설정
              "&:last-child": { paddingBottom: "10px" }, // MUI의 기본 스타일 오버라이드
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "#ffffff",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "14px",
                fontWeight: "bold",
                lineHeight: 1.2,
                marginBottom: "4px",
              }}
              title={video.title} // 툴팁으로 전체 제목 보이기
            >
              {video.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#BBBBBB",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "12px",
                lineHeight: 1.2,
              }}
              title={video.customComment} // 툴팁으로 전체 코멘트 보이기
            >
              {video.customComment}
            </Typography>
          </CardContent>
        </Box>
      </Card>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "#1E1E1E",
            p: 3,
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ color: "#FFF", mb: 2 }}>
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
              input: { color: "#FFFFFF" },
              "& .MuiOutlinedInput-root": {
                color: "#FFFFFF", // 텍스트 필드의 텍스트 색상 추가
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "#FFF",
                "&:hover fieldset": { borderColor: "#AAA" },
                "&.Mui-focused fieldset": { borderColor: "#777" },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={() => setOpenModal(false)}
              sx={{ backgroundColor: "#FFFFFF", color: "#000", mr: 2 }}
            >
              취소
            </Button>
            <Button
              onClick={handleUpdate}
              sx={{
                backgroundColor: "#A88FFF",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "8px 16px",
                "&:hover": { backgroundColor: "#9776FF" },
              }}
              disabled={loading}
            >
              {loading ? "저장 중..." : "저장"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
