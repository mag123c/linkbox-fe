import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { AppBar, IconButton, Toolbar } from "@mui/material";

export default function AppNavBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1E1E1E" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 유튜브 아이콘 */}
        <IconButton edge="start" color="inherit">
          <YouTubeIcon sx={{ fontSize: 32, color: "#FF0000" }} />
        </IconButton>

        {/* 우측 버튼 (카테고리 추가 & 영상 추가) */}
        <div>
          <IconButton color="inherit">
            <FolderIcon /> {/* 카테고리 추가 */}
          </IconButton>
          <IconButton color="inherit">
            <AddIcon /> {/* 영상 추가 */}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
