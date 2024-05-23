import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, Skeleton } from '@mui/material';

const tableSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
  <TableRow
    key={item}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell><Skeleton /></TableCell>
    <TableCell><Skeleton /></TableCell>
    <TableCell><Skeleton /></TableCell>
  </TableRow>
));


const LIMIT = 10;

export default function NotesTable({ isActive }) {

  const [response, setResponse] = useState(null);
	const [offset, setOffset] = useState(0);

  const navigate = useNavigate();

  const NoteTableRow = ({ id, title, description, isActive }) => (
    <TableRow
      key={id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
      }}
      hover
      onClick={() => navigate(id.toString())}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{
          maxWidth: 300,
          minWidth: 300,
          textWrap: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </TableCell>
      <TableCell
        align="right"
        sx={{
          maxWidth: 300,
          minWidth: 300,
          textWrap: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {description}
      </TableCell>
      <TableCell align="right" sx={{ maxWidth: 300, minWidth: 300, }}>{isActive ? "Active" : "Archived"}</TableCell>
    </TableRow>
  );

	useEffect(() => {

		const getNotes = async () => {

			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notes?isActive=${isActive}`);
			const data = await res.json();
			setResponse(data);
			
		}

		getNotes();

	}, [isActive]);

  const handlePageChange = async (event, page) => {

		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notes?offset=${LIMIT * page}&isActive=${isActive}`);
		const data = await res.json();
		setResponse(data);
		setOffset(LIMIT * page);
		
	}

  let tableContent = tableSkeleton;

  if (response) {

    if (response.notes?.length > 0) {
      tableContent = response.notes.map((row) => (
        <NoteTableRow
          key={row.id}
          id={row.id}
          title={row.title}
          description={row.description}
          isActive={row.isActive}
        />
      ));
    } else {
      tableContent = <TableRow><TableCell>No Data</TableCell></TableRow>
    }

  }

  
  return (
    <>
      <TableContainer component={Paper} sx={{ width: 940, margin: "0 auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 225 }}>Title</TableCell>
              <TableCell align="right" sx={{ width: 225 }}>
                Description
              </TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ width: 940, mx: "auto", marginBottom: 5 }}
        component="div"
        rowsPerPageOptions={[LIMIT]}
        rowsPerPage={LIMIT} // limit
        count={response?.totalRecords || 0} // totalRecords
        page={offset / LIMIT} // offset / limit
        onPageChange={handlePageChange}
      />
    </>
  );

}