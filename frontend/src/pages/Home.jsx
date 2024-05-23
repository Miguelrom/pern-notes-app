import { Typography, Box } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DevicesIcon from '@mui/icons-material/Devices';
import Instructions from "../components/Instructions";

export default function Home() {
  return (
    <>
      <Typography align="center" variant="h4" component="h1" sx={{ marginBottom: 10 }} >
        Welcome to your Notes!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 500, marginBottom: 10, mx: 'auto'}} >
        <EditNoteIcon sx={{ fontSize: 60 }} />
        <AutoStoriesIcon sx={{ fontSize: 60 }} />
        <DevicesIcon sx={{ fontSize: 60 }} />
      </Box>
      <Instructions />
    </>
  );
}