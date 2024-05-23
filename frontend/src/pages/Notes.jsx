import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Select, MenuItem, InputLabel } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import NotesTable from "../components/NotesTable";

let persistentIsActive = true;

export default function Notes() {

  const [isActive, setIsActive] = useState(persistentIsActive);

  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    persistentIsActive = event.target.value;
    setIsActive(event.target.value);
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ width: 940, margin: "0 auto", marginBottom: 1 }}
      >
        <InputLabel>
        Filter:&nbsp;
        <Select value={isActive} onChange={handleSelectChange} size="small">
          <MenuItem value={true} >Active</MenuItem>
          <MenuItem value={false} >Archived</MenuItem>
        </Select>
        </InputLabel>
        
        <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={() => navigate('new')} >
          New
        </Button>
      </Box>
      <NotesTable isActive={isActive} />
    </>
  );
}