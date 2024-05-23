import { useState, useRef } from "react";
import { Form } from "react-router-dom";
import {
  TextField,
  Stack,
  Box,
  Paper,
  Button,
  Switch,
  FormControlLabel,
  Typography,
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

export default function NoteForm({
  title = 'New note',
  method = "post",
  note = { title: "", description: "", isActive: true },
}) {

  const [isTitleValid, setIsTitleValid] = useState(note.title !== '');

  const titleRef = useRef({ value: note.title });

  const handleTitleChange = (event) => {

    if (event.target.value !== '') {
      setIsTitleValid(true);
    } else {
      setIsTitleValid(false);
    }
  }

  return (
    <Paper elevation={5} sx={{ maxWidth: 600, margin: "0 auto", padding: 5 }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </Box>
      <Form method={method}>
        <Stack spacing={2} sx={{ marginBottom: 2 }}>
          <TextField
            inputRef={titleRef}
            name="title"
            label="Title"
            required
            error={!isTitleValid}
            helperText={!isTitleValid && "Required field"}
            defaultValue={note.title}
            onChange={handleTitleChange}
          />
          <TextField
            name="description"
            label="Description"
            defaultValue={note.description}
            multiline
            minRows={3}
          />
          <FormControlLabel
            name="isActive"
            label="Active"
            control={<Switch defaultChecked={note.isActive} />}
          />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            size="large"
            disabled={!isTitleValid}
          >
            Save
          </Button>
        </Box>
      </Form>
    </Paper>
  );
}

