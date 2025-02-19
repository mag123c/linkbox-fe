import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addLinks } from "../utils/apis/linksApi";
import { Category } from "./CategoryBar";

export default function AddVideoForm({
  open,
  onClose,
  onVideoAdded,
  categories,
  selectedCategory,
}: {
  open: boolean;
  onClose: () => void;
  onVideoAdded: () => void;
  categories: Category[];
  selectedCategory: string;
}) {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoComment, setVideoComment] = useState("");
  const [category, setCategory] = useState(selectedCategory);

  useEffect(() => {
    if (open && selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [open, selectedCategory]);

  const handleAddVideo = async () => {
    if (!videoUrl.trim() || !category) return;
    try {
      await addLinks(
        {
          url: videoUrl,
          memo: videoComment.trim() || "",
        },
        categories.find((cat) => cat.name === category)!.id
      );
      onVideoAdded();
      handleClose();
    } catch (error) {
      console.error("비디오 추가 실패:", error);
    }
  };

  const handleClose = () => {
    setVideoUrl("");
    setVideoComment("");
    setCategory(selectedCategory);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#1E1E1E",
          borderRadius: "16px",
          padding: "16px",
        },
      }}
    >
      <DialogTitle>
        <Typography
          sx={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "18px" }}
        >
          비디오 추가
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel sx={{ color: "#BBBBBB" }}>카테고리 선택</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              color: "#FFFFFF",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#444",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
              },
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.name} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="링크(필수)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          autoFocus
          variant="outlined"
          sx={{
            mt: 2,
            input: { color: "#FFFFFF" },
            label: { color: "#BBBBBB" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              borderColor: "#444",
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#FFF" },
            },
          }}
        />
        <TextField
          fullWidth
          label="메모 (선택사항)"
          value={videoComment}
          onChange={(e) => setVideoComment(e.target.value)}
          variant="outlined"
          sx={{
            mt: 2,
            input: { color: "#FFFFFF" },
            label: { color: "#BBBBBB" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              borderColor: "#444",
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#FFF" },
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "#444",
            color: "#FFFFFF",
            borderRadius: "20px",
            padding: "8px 20px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#666" },
          }}
        >
          닫기
        </Button>
        <Button
          onClick={handleAddVideo}
          sx={{
            backgroundColor: "#FF3B30",
            color: "#FFFFFF",
            borderRadius: "20px",
            padding: "8px 20px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#CC2A24" },
          }}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}
