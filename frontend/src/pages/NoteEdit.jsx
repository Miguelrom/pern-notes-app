import { useRouteLoaderData } from "react-router-dom";
import NoteForm from "../components/NoteForm";

export default function NoteEdit() {

  const note = useRouteLoaderData('note-detail');

  return (
    <NoteForm title="Edit note" method="PUT" note={note} />
  );
}