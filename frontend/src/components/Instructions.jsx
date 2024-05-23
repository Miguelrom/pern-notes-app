import { Box, Typography } from "@mui/material";

export default function Instructions() {
  return (
    <Box>
      <Typography variant="h4" component="h2">
        Instructions
      </Typography>
      <Box component="ul" sx={{ fontSize: 20, lineHeight: 2}} >
        <li>
          To browse the notes go to the Notes menu option and
          use the table pagination controls. You can filter by active and archived notes too.
        </li>
        <li>
          To see the full information about a given note click on its
          corresponding row in the table.
        </li>
        <li>
          To edit or delete a note click on its corresponding row and click
          on the EDIT or DELETE button.
        </li>
        <li>
          To create a new note go to the Notes menu option and click on
          the NEW button.
        </li>
      </Box>
    </Box>
  );
}