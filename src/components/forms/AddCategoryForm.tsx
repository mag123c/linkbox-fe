// AddCategoryForm.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { addCategory } from "../../services/categoryService";
import { Category } from "../../types/category";

interface AddCategoryFormProps {
  open: boolean;
  onClose: () => void;
  onCategoryAdded: (newCategory: Category) => void;
}

export default function AddCategoryForm({
  open,
  onClose,
  onCategoryAdded,
}: AddCategoryFormProps) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async () => {
    if (!categoryName.trim()) return;
    try {
      const newCategory = await addCategory(categoryName);
      onCategoryAdded(newCategory!);
      setCategoryName("");
    } catch (error) {
      console.error("카테고리 추가 실패", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>새 폴더 추가</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="폴더 이름"
          type="text"
          fullWidth
          variant="standard"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleSubmit}>추가</Button>
      </DialogActions>
    </Dialog>
  );
}
