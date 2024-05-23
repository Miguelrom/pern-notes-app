import { useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  Paper,
  Stack,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function NoteItem({ note }) {

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const submit = useSubmit();

  const navigate = useNavigate();

  const handleDelete = () => {
    // This triggers the action registered for this route
    submit(null, { method: 'DELETE'});
  }

  const handleDialogclose = () => {
    setDeleteDialogOpen(false);
  }

  return (
    <>
      <Paper elevation={5} sx={{ maxWidth: 600, margin: "0 auto", padding: 5 }}>
        <Stack spacing={2} sx={{ marginBottom: 2 }}>
          <Box>
            <Typography variant="h6">Title</Typography>
            <Typography>{note.title}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">Description</Typography>
            <Typography>{note.description}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">Status</Typography>
            <Typography>{note.isActive ? 'Active' : 'Archived'}</Typography>
          </Box>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button
            color="success"
            variant="contained"
            startIcon={<EditIcon />}
            size="large"
            onClick={() => navigate("edit")}
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            size="large"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete
          </Button>
        </Box>
      </Paper>
      <Dialog open={isDeleteDialogOpen} onClose={handleDialogclose}>
        <DialogTitle>Delete note</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this note?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setDeleteDialogOpen(false)} >Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}