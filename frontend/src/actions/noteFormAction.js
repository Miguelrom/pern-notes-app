import { redirect } from "react-router-dom";

export async function noteFormAction({ request, params }) {

  const method = request.method;
  const data = await request.formData();

  const noteData = {
    title: data.get('title'),
    description: data.get('description'),
    isActive: data.get('isActive') === 'on',
  }

  const url = `${import.meta.env.VITE_BACKEND_URL}/notes${
    method === "PUT" ? `/${params.noteId}` : ""
  }`;

  const response = await fetch(url, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    throw new Error({ message: 'Could not save note.' }, { status: 500 });
  }

  return redirect('/notes');

}