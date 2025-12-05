
import { z } from 'zod';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addNote(
  prevState: { message: string },
  formData: FormData,
) {
  const schema = z.object({
    note: z.string().min(5),
  });

  const parse = schema.safeParse({
    note: formData.get('note'),
  });

  if (!parse.success) {
    const errors = parse.error.flatten().fieldErrors;
    if (errors.note) return { message: `The note ${errors.note}` };
    console.log('⛳️ | errors:', errors);
    return { message: 'Failed to create note!!!' };
  }

  const data = parse.data;

  try {
    const response = await fetch(`${API_URL}/notes`, {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        content: data.note
      })
    });
    if (response.status !== 201) throw new Error();
    return { message: 'Note created ✅' };
  } catch (e) {
    return { message: 'Failed to create note!!' };
  }
}