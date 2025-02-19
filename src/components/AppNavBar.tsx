import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useState } from "react";
import AddCategoryForm from "./AddCategoryForm";
import AddVideoForm from "./AddVideoForm";
import { Category } from "./CategoryBar";

export default function AppNavBar({
  categories,
  selectedCategory,
  onCategoryAdded,
  onVideoAdded,
}: {
  categories: Category[];
  selectedCategory: string;
  onCategoryAdded: () => void;
  onVideoAdded: () => void;
}) {
  const [openCategory, setOpenCategory] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  const handleOpenCategory = () => setOpenCategory(true);
  const handleCloseCategory = () => setOpenCategory(false);

  const handleOpenVideo = () => setOpenVideo(true);
  const handleCloseVideo = () => setOpenVideo(false);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1E1E1E" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton edge="start" color="inherit">
            <YouTubeIcon sx={{ fontSize: 32, color: "#FF0000" }} />
          </IconButton>
          <div>
            <IconButton color="inherit" onClick={handleOpenCategory}>
              <FolderIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleOpenVideo}
              disabled={!selectedCategory}
            >
              <AddIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <AddCategoryForm
        open={openCategory}
        onClose={handleCloseCategory}
        onCategoryAdded={onCategoryAdded}
      />

      <AddVideoForm
        open={openVideo}
        onClose={handleCloseVideo}
        categories={categories}
        selectedCategory={selectedCategory}
        onVideoAdded={onVideoAdded}
      />
    </>
  );
}
