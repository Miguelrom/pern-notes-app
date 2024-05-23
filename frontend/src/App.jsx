import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Root from "./pages/Root";
import Notes from "./pages/Notes";
import NewNote from "./pages/NewNote";
import { noteFormAction } from "./actions/noteFormAction";
import NoteDetail from "./pages/NoteDetail";
import NoteEdit from "./pages/NoteEdit";
import { deleteNoteAction } from "./actions/deleteNoteAction";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Some error occurred</p>,
    children: [{
      index: true,
      element: <Home />,
    },
    {
      path: 'notes',
      children: [
        {
          index: true,
          element: <Notes />
        },
        {
          path: ':noteId',
          id: 'note-detail',
          loader: NoteDetail.loader,
          children: [
            {
              index: true,
              element: <NoteDetail />,
              action: deleteNoteAction,
            },
            {
              path: 'edit',
              element: <NoteEdit />,
              action: noteFormAction,
            }
          ]
        },
        {
          path: 'new',
          element: <NewNote />,
          action: noteFormAction,
        }
      ]
    },
  ],
  },
]);

function App() {

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  )
}

export default App
