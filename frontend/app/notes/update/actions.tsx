
import { z } from 'zod';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateNote(prevState: any, formData: FormData) {

  const schema = z.object({
    note: z.string().nullable(),
    isArchived: z.string().nullable(),
    isDeleted: z.string().nullable(),
  });

  const parse = schema.safeParse({
    note: formData.get('note'),
    isArchived: formData.get('isArchived'),
    isDeleted: formData.get('isDeleted'),
  });


  if (!parse.success) {
    const errors = parse.error.flatten().fieldErrors;
    console.log('⛳️ | updateNote | errors:', errors);
    return { ...prevState, message: 'Failed to update note!!!' };
  }

  const data = parse.data;

  try {
    const body = JSON.stringify({
      uuid: prevState.uuid,
      content: data.note || prevState.content,
      isArchived: data.isArchived || false,
      isDeleted: data.isDeleted || false,
    });
    const response = await fetch(`${API_URL}/notes/${prevState.uuid}`, {
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
      body,
    });
    if (response.status !== 200) throw new Error();
    const newNote = await response.json();
    return { ...newNote, message: 'Note updated ✅' };
  } catch (e) {
    console.log('⛳️ | updateNote | e:', e);
    return { ...prevState, message: 'Failed to update note!!' };
  }
}