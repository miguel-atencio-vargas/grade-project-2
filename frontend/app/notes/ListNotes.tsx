'use client';

import GoToPage from '@/components/GoToPage';
import { INote } from '@/interfaces/Note.interface';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ListNotes({ isArchived = false }: { isArchived?: boolean }) {
  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch(`${API_URL}/notes?isArchived=${isArchived}`);
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        }
      } catch (error) {
        console.error('Failed to fetch notes', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [isArchived]);

  if (loading) return <p>Loading notes...</p>;

  return (
    <div className='p-3'>
      {
        (notes.length === 0 && isArchived === false)
          ? <GoToPage href={'notes/add'} text={'Add a note'} />
          : <ul className='grid grid-cols-4 gap-4'> {notes.map((note: INote) => (
            <li className="border-2 border-slate-700 rounded-lg p-2 overflow-auto" key={note.uuid}>
              <Link className="text-1xl text-center flex justify-center" href={`update?uuid=${note.uuid}`}>{note.content}</Link>
            </li>
          ))} </ul>
      }
    </div>
  );
}
