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
            <li className="aspect-square rounded-3xl p-6 shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer flex items-center justify-center text-center overflow-hidden bg-white border-2 border-pastel-lavender hover:border-pastel-mint group" key={note.uuid}>
              <Link className="w-full h-full flex items-center justify-center text-xl font-semibold text-gray-700 group-hover:text-pastel-pink transition-colors" href={process.env.NODE_ENV === 'development' ? `/notes/update?uuid=${note.uuid}` : `/notes/update/index.html?uuid=${note.uuid}`}>
                <span className="line-clamp-5">{note.content}</span>
              </Link>
            </li>
          ))} </ul>
      }
    </div>
  );
}
