import { redirect } from "react-router-dom";

export async function deleteNoteAction({ params }) {
  
  const url = `${import.meta.env.VITE_BACKEND_URL}/notes/${params.noteId}`;

  const res = await fetch (url, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error({ message: 'Could not delete note.' }, { status: 500 });
  }

  return redirect('/notes');

}