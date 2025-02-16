import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useState } from "react";
import AddCategoryForm from "./AddCategoryForm";

export default function AppNavBar({
  onCategoryAdded,
}: {
  onCategoryAdded: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1E1E1E" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* 유튜브 아이콘 */}
          <IconButton edge="start" color="inherit">
            <YouTubeIcon sx={{ fontSize: 32, color: "#FF0000" }} />
          </IconButton>
          {/* 우측 버튼 (카테고리 추가 & 영상 추가) */}
          <div>
            <IconButton color="inherit" onClick={handleOpen}>
              <FolderIcon />
            </IconButton>
            <IconButton color="inherit">
              <AddIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <AddCategoryForm
        open={open}
        onClose={handleClose}
        onCategoryAdded={onCategoryAdded}
      />
    </>
  );
}
