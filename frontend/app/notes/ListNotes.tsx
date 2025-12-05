import GoToPage from '@/components/GoToPage';
import { INote } from '@/interfaces/Note.interface';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function ListNotes({ isArchived = false }) {
  const response = await fetch(`${API_URL}/notes?isArchived=${isArchived}`, {
    cache: 'no-store'
  });
  const notes = await response.json();

  return (
    <div className='p-3'>
      {
        (notes.length === 0 && isArchived===false)
        ? <GoToPage href={'./notes/add'} text={'Add a note'} />
        : <ul className='grid grid-cols-4 gap-4'> { notes.map((note: INote) => (
          <li className="border-2 border-slate-700 rounded-lg p-2 overflow-auto" key={note.uuid}>
            <Link className="text-1xl text-center flex justify-center" href={`./update/${note.uuid}`}>{note.content}</Link>
          </li>
        )) } </ul>
      }
    </div>
  );
}
