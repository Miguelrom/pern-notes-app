import { useRouteLoaderData, defer } from "react-router-dom";
import NoteItem from "../components/NoteItem";

export default function NoteDetail() {

  const note = useRouteLoaderData('note-detail');

  return (
    <NoteItem note={note} />
  );
}

NoteDetail.loader = async ({ params }) => {

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notes/${params.noteId}`);

  if (res.ok) {
    const note = await res.json()
    return defer(note);
  }
  
  throw new Error('Could not fetch note');

}